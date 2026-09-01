import { GoogleGenAI } from "@google/genai";
import Groq from "groq-sdk";
import { AIAnalysisResponse } from "../src/types.js";

/**
 * AI Provider Layer for Paralelismo Profético
 * Implements fallback logic: Groq -> Gemini -> Fallback
 */

const SYSTEM_INSTRUCTION_COMPARE = `Eres un experto historiador, teólogo analista bíblico y periodista ético.
Tu tarea es analizar la consulta del usuario sobre acontecimientos de actualidad y realizar una comparación rigurosa, respetuosa y profunda con el contenido de la Biblia (Antiguo y Nuevo Testamento).

Estructura tu respuesta en formato JSON estricto con las siguientes llaves:
1. "analysis": Un texto bien redactado (3-4 párrafos en español) explicando las semejanzas históricas, teológicas y sociales entre lo sucedido en la Biblia y lo que reportan los diarios de noticias.
2. "biblicalVerses": Un arreglo de objetos con las llaves "reference" (ej. "Éxodo 12:37"), "text" (el pasaje bíblico), y "application" (cómo se conecta con el hecho).
3. "newsSummary": Un resumen conciso de los titulares y hechos noticiosos relevantes.

Respóndeme ÚNICAMENTE en JSON válido sin marcadores de markdown.`;

export async function getAIComparison(userPrompt: string): Promise<AIAnalysisResponse> {
  const groqKey = (process.env.GROQ_API_KEY || "").trim().replace(/^["\']|["\']$/g, "");
  const geminiKey = (process.env.GEMINI_API_KEY || "").trim().replace(/^["\']|["\']$/g, "");
  const startTime = Date.now();

  // Fallback response for complete failure
  const finalFallback: AIAnalysisResponse = {
    analysis: `Análisis para "${userPrompt}":\n\nEn la actualidad, los acontecimientos reportados reflejan intensos paralelos con los relatos del Antiguo y Nuevo Testamento. Desde el éxodo masivo y el desplazamiento forzado, hasta los desafíos económicos e institucionales.\n\nFrente a estas adversidades, la solidaridad comunitaria y el apoyo mutuo encarnan la comunión fraterna descrita en los Evangelios y Hechos de los Apóstoles.`,
    biblicalVerses: [
      {
        reference: "Jeremías 29:11",
        text: "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.",
        application: "Esperanza de restauración, paz y fortaleza en medio de la adversidad."
      }
    ],
    newsSummary: `Hechos de actualidad vinculados a "${userPrompt}" reflejan la constante lucha humana por la dignidad y la justicia social.`,
    timestamp: new Date().toISOString()
  };

  // 1. TRY GROQ
  if (groqKey && groqKey !== "MY_GROQ_API_KEY") {
    const groqStartTime = Date.now();
    try {
      console.log(`[AIProvider] PROVIDER=GROQ START`);
      const groq = new Groq({ apiKey: groqKey });
      const completion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: SYSTEM_INSTRUCTION_COMPARE },
          { role: "user", content: userPrompt }
        ],
        model: "llama-3.3-70b-versatile",
        response_format: { type: "json_object" }
      });

      const content = completion.choices[0]?.message?.content;
      if (content) {
        const parsed = JSON.parse(content);
        const duration = Date.now() - groqStartTime;
        console.log(`[AIProvider] PROVIDER=GROQ SUCCESS duration=${duration}ms`);
        return {
          ...parsed,
          timestamp: new Date().toISOString()
        };
      }
    } catch (err: any) {
      const duration = Date.now() - groqStartTime;
      const statusCode = err.status || err.statusCode || 'unknown';
      console.error(`[AIProvider] PROVIDER=GROQ ERROR duration=${duration}ms code=${statusCode} message="${err.message}"`);
    }
  }

  // 2. TRY GEMINI (Fallback)
  if (geminiKey && geminiKey !== "MY_GEMINI_API_KEY") {
    const geminiStartTime = Date.now();
    try {
      console.log(`[AIProvider] PROVIDER=GEMINI START`);
      const genAI = new GoogleGenAI({
        apiKey: geminiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const response = await genAI.models.generateContent({
        model: "gemini-1.5-flash",
        contents: userPrompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION_COMPARE,
          responseMimeType: "application/json",
        },
      });

      const rawText = response.text || "{}";
      const parsedData = JSON.parse(rawText);
      const duration = Date.now() - geminiStartTime;
      console.log(`[AIProvider] PROVIDER=GEMINI SUCCESS duration=${duration}ms`);

      return {
        analysis: parsedData.analysis || finalFallback.analysis,
        biblicalVerses: parsedData.biblicalVerses || finalFallback.biblicalVerses,
        newsSummary: parsedData.newsSummary || finalFallback.newsSummary,
        timestamp: new Date().toISOString()
      };
    } catch (err: any) {
      const duration = Date.now() - geminiStartTime;
      const statusCode = err.status || err.statusCode || 'unknown';
      const errMsg = err.message || String(err);
      console.error(`[AIProvider] PROVIDER=GEMINI ERROR duration=${duration}ms code=${statusCode} message="${errMsg}"`);
    }
  }

  // 3. FINAL FALLBACK
  console.warn(`[AIProvider] PROVIDER=NONE FALLBACK active duration=${Date.now() - startTime}ms`);
  return finalFallback;
}

export interface AICompletionResult {
  text: string | null;
  groundingSources?: { title: string; uri: string }[];
}

/**
 * Generic function to call AI with specific system instruction and prompt
 * Useful for the Parallelism Engine
 */
export async function getAICompletion(params: {
  systemInstruction: string;
  prompt: string;
  responseMimeType?: "application/json" | "text/plain";
}): Promise<AICompletionResult> {
  const groqKey = (process.env.GROQ_API_KEY || "").trim().replace(/^["\']|["\']$/g, "");
  const geminiKey = (process.env.GEMINI_API_KEY || "").trim().replace(/^["\']|["\']$/g, "");

  // 1. Groq - Rápido pero sin búsqueda web directa
  if (groqKey && groqKey !== "MY_GROQ_API_KEY") {
    try {
      const groq = new Groq({ apiKey: groqKey });
      const completion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: params.systemInstruction },
          { role: "user", content: `${params.prompt}\n\nEnfócate prioritariamente en noticias ocurridas en los últimos 30 días.` }
        ],
        model: "llama-3.3-70b-versatile",
        response_format: params.responseMimeType === "application/json" ? { type: "json_object" } : undefined
      });
      return { text: completion.choices[0]?.message?.content || null };
    } catch (err: any) {
      console.error(`[AIProvider] getAICompletion (Groq) Error: ${err.message}`);
    }
  }

  // 2. Gemini - Lento pero rastrea la web en busca de hallazgos reales
  if (geminiKey && geminiKey !== "MY_GEMINI_API_KEY") {
    try {
      const genAI = new GoogleGenAI({
        apiKey: geminiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const response = await genAI.models.generateContent({
        model: "gemini-1.5-flash",
        contents: `${params.prompt}\n\nREQUISITO: Realiza una búsqueda de noticias ocurridas específicamente entre hace 1 y 30 días.`,
        config: {
          systemInstruction: params.systemInstruction,
          responseMimeType: params.responseMimeType || "text/plain",
          tools: [{ googleSearch: {} }] as any,
        },
      });

      const groundingSources: { title: string; uri: string }[] = [];
      const candidates = (response as any).candidates?.[0];
      const groundingMetadata = candidates?.groundingMetadata;
      const groundingChunks = groundingMetadata?.groundingChunks || [];

      for (const chunk of groundingChunks) {
        if (chunk.web?.uri) {
          groundingSources.push({
            title: chunk.web.title || chunk.web.uri,
            uri: chunk.web.uri
          });
        }
      }

      return {
        text: response.text || null,
        groundingSources: groundingSources.length > 0 ? groundingSources : undefined
      };
    } catch (err: any) {
      console.error(`[AIProvider] getAICompletion (Gemini) Error: ${err.message}`);
    }
  }

  return { text: null };
}
