import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { generateGlobalParallelism } from "./server/parallelism";
import { scrapeGlobalNews } from "./server/scraper";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini Client lazily or safely
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

// API endpoint for Global News Scraper & Biblical Parallelism Engine (No geographic boundary)
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
    const errorMessage = err instanceof Error ? err.message : "Error interno al procesar paralelismos";
    return res.status(500).json({ error: errorMessage });
  }
});

// Also support GET for fast polling or pre-fetching
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
    const errorMessage = err instanceof Error ? err.message : "Error interno al obtener paralelismos";
    return res.status(500).json({ error: errorMessage });
  }
});

// Endpoint to inspect scraped global news feeds directly
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

// Cache for /api/compare to avoid rate limits
const compareCache = new Map<string, { data: any; expiry: number }>();

// API endpoint for dynamic Biblical vs Venezuela News comparison
app.post("/api/compare", async (req, res) => {
  try {
    const { query, customTopic } = req.body;
    const userPrompt = (query || customTopic || "Venezuela noticias recientes y su relacion con la Biblia").trim();
    const cacheKey = userPrompt.toLowerCase();

    // Check cache
    if (compareCache.has(cacheKey)) {
      const cached = compareCache.get(cacheKey)!;
      if (Date.now() < cached.expiry) {
        return res.json(cached.data);
      }
    }

    const ai = getGeminiClient();

    const fallbackResponse = {
      analysis: `Análisis para "${userPrompt}":\n\nEn la actualidad, los acontecimientos reportados reflejan intensos paralelos con los relatos del Antiguo y Nuevo Testamento. Desde el éxodo masivo y el desplazamiento forzado (similar a las dispersiones de Israel en Éxodo y Jeremías), hasta los desafíos económicos, la inflación y la pérdida del poder adquisitivo del trabajo (Hageo 1:6, Apocalipsis 6:6).\n\nAsimismo, las demandas por justicia, verdad institucional y dignidad ciudadana evocan la constante prédica profética de Isaías y Amós en contra de las leyes gravosas y el abuso del poder. Frente a estas adversidades, la solidaridad comunitaria y el apoyo mutuo encarnan la comunión fraterna descrita en los Evangelios y Hechos de los Apóstoles.`,
      biblicalVerses: [
        {
          reference: "Jeremías 29:11",
          text: "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.",
          application: "Esperanza de restauración, paz y fortaleza en medio de la adversidad."
        },
        {
          reference: "Proverbios 29:2",
          text: "Cuando los justos dominan, el pueblo se alegra; mas cuando domina el impío, el pueblo gime.",
          application: "Reflejo de la búsqueda de justicia, integridad institucional y paz social."
        },
        {
          reference: "Hageo 1:6",
          text: "Sembráis mucho, y recogéis poco; coméis, y no os saciáis... y el que trabaja a jornal recibe su jornal en saco roto.",
          application: "Paralelo con los desafíos económicos y la depreciación del salario frente al costo de vida."
        }
      ],
      newsSummary: `Hechos de actualidad vinculados a "${userPrompt}" reflejan la constante lucha humana por la dignidad, la justicia social y el bienestar de las familias.`,
      groundingSources: [
        { title: "ACNUR - Informes Globales", uri: "https://www.unhcr.org" },
        { title: "BBC Mundo - Cobertura de Actualidad", uri: "https://www.bbc.com/mundo" }
      ],
      timestamp: new Date().toISOString()
    };

    if (!ai) {
      return res.json(fallbackResponse);
    }

    try {
      const systemInstruction = `Eres un experto historiador, teólogo analista bíblico y periodista ético.
Tu tarea es analizar la consulta del usuario sobre acontecimientos de actualidad y realizar una comparación rigurosa, respetuosa y profunda con el contenido de la Biblia (Antiguo y Nuevo Testamento).

Estructura tu respuesta en formato JSON estricto con las siguientes llaves:
1. "analysis": Un texto bien redactado (3-4 párrafos en español) explicando las semejanzas históricas, teológicas y sociales entre lo sucedido en la Biblia y lo que reportan los diarios de noticias.
2. "biblicalVerses": Un arreglo de objetos con las llaves "reference" (ej. "Éxodo 12:37"), "text" (el pasaje bíblico), y "application" (cómo se conecta con el hecho).
3. "newsSummary": Un resumen conciso de los titulares y hechos noticiosos relevantes.

Respóndeme ÚNICAMENTE en JSON válido sin marcadores de markdown.`;

      const promptText = `Analiza el siguiente tema o consulta relacionada con la actualidad y la Biblia: "${userPrompt}".
Por favor busca información actualizada relevante y compara con pasajes bíblicos.`;

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
      let parsedData;
      try {
        parsedData = JSON.parse(rawText);
      } catch {
        parsedData = fallbackResponse;
      }

      // Extract grounding search metadata
      const candidates = response.candidates?.[0];
      const groundingChunks = candidates?.groundingMetadata?.groundingChunks || [];
      const groundingSources: { title: string; uri: string }[] = [];

      for (const chunk of groundingChunks) {
        if (chunk.web?.uri) {
          groundingSources.push({
            title: chunk.web.title || chunk.web.uri,
            uri: chunk.web.uri
          });
        }
      }

      const resultPayload = {
        analysis: parsedData.analysis || fallbackResponse.analysis,
        biblicalVerses: parsedData.biblicalVerses && parsedData.biblicalVerses.length > 0 ? parsedData.biblicalVerses : fallbackResponse.biblicalVerses,
        newsSummary: parsedData.newsSummary || fallbackResponse.newsSummary,
        groundingSources: groundingSources.length > 0 ? groundingSources : fallbackResponse.groundingSources,
        timestamp: new Date().toISOString()
      };

      compareCache.set(cacheKey, { data: resultPayload, expiry: Date.now() + 5 * 60 * 1000 });
      return res.json(resultPayload);

    } catch (apiError: unknown) {
      // Gracefully handle Gemini rate limit (429) or temporary quota exhaustion
      compareCache.set(cacheKey, { data: fallbackResponse, expiry: Date.now() + 2 * 60 * 1000 });
      return res.json(fallbackResponse);
    }

  } catch (err: unknown) {
    console.error("Error in /api/compare handler:", err);
    const errorMessage = err instanceof Error ? err.message : "Error interno del servidor";
    return res.status(500).json({ error: errorMessage });
  }
});

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "paralelismo-profetico"
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server executing on http://0.0.0.0:${PORT}`);
  });
}

startServer();
