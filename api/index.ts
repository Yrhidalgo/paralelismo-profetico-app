import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { generateGlobalParallelism } from "../server/parallelism";
import { scrapeGlobalNews } from "../server/scraper";

dotenv.config();

const app = express();
app.use(express.json());

// Initialize Gemini Client
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// HEALTH
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "paralelismo-profetico",
    env: "vercel-serverless"
  });
});

// PARALLELISM POST
app.post("/api/parallelism", async (req, res) => {
  try {
    const { category, customSearch, refresh } = req.body || {};
    const ai = getGeminiClient();
    const result = await generateGlobalParallelism(ai, {
      category: category || "all",
      customSearch,
      refresh: !!refresh,
    });
    return res.json(result);
  } catch (err: unknown) {
    console.error("Error in /api/parallelism:", err);
    return res.status(500).json({ error: "Error interno" });
  }
});

// PARALLELISM GET
app.get("/api/parallelism", async (req, res) => {
  try {
    const category = typeof req.query.category === "string" ? req.query.category : "all";
    const customSearch = typeof req.query.q === "string" ? req.query.q : undefined;
    const ai = getGeminiClient();
    const result = await generateGlobalParallelism(ai, {
      category,
      customSearch,
    });
    return res.json(result);
  } catch (err: unknown) {
    console.error("Error in GET /api/parallelism:", err);
    return res.status(500).json({ error: "Error interno" });
  }
});

// SCRAPED NEWS
app.get("/api/scraped-news", async (req, res) => {
  try {
    const category = typeof req.query.category === "string" ? req.query.category : "all";
    const data = await scrapeGlobalNews(category);
    return res.json(data);
  } catch (err: unknown) {
    console.error("Error in /api/scraped-news:", err);
    return res.status(500).json({ error: "No se pudieron obtener titulares" });
  }
});

// COMPARE (IA)
app.post("/api/compare", async (req, res) => {
  try {
    const { query, customTopic } = req.body;
    const userPrompt = (query || customTopic || "Venezuela noticias recientes y su relacion con la Biblia").trim();
    const ai = getGeminiClient();

    // Fallback response for testing/errors
    const fallbackResponse = {
      analysis: "Análisis no disponible en modo offline.",
      biblicalVerses: [],
      newsSummary: "Error al conectar con la IA.",
      groundingSources: [],
      timestamp: new Date().toISOString()
    };

    if (!ai) return res.json(fallbackResponse);

    const systemInstruction = `Eres un experto historiador, teólogo analista bíblico y periodista ético.
Tu tarea es analizar la consulta del usuario sobre acontecimientos de actualidad y realizar una comparación rigurosa, respetuosa y profunda con el contenido de la Biblia (Antiguo y Nuevo Testamento).

Estructura tu respuesta en formato JSON estricto con las siguientes llaves:
1. "analysis": Un texto bien redactado (3-4 párrafos en español) explicando las semejanzas históricas, teológicas y sociales entre lo sucedido en la Biblia y lo que reportan los diarios de noticias.
2. "biblicalVerses": Un arreglo de objetos con las llaves "reference", "text", y "application".
3. "newsSummary": Un resumen conciso de los titulares y hechos noticiosos relevantes.

Respóndeme ÚNICAMENTE en JSON válido sin marcadores de markdown.`;

    const promptText = `Analiza el siguiente tema o consulta relacionada con la actualidad y la Biblia: "${userPrompt}".`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        tools: [{ googleSearch: {} }],
      },
    });

    const rawText = response.text || "{}";
    return res.json(JSON.parse(rawText));

  } catch (err: unknown) {
    console.error("Error in /api/compare:", err);
    return res.status(500).json({ error: "Error interno de IA" });
  }
});

export default app;
