import express from "express";
import dotenv from "dotenv";
import { generateGlobalParallelism } from "../server/parallelism.js";
import { scrapeGlobalNews } from "../server/scraper.js";
import { getAIComparison } from "../server/aiProvider.js";

dotenv.config();

const app = express();
app.use(express.json());

// CORS Middleware for Android/Capacitor
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// HEALTH (Vercel path)
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "paralelismo-profetico",
    env: "vercel-serverless",
    path: "/api/health",
    providers: {
      groq: !!process.env.GROQ_API_KEY,
      gemini: !!process.env.GEMINI_API_KEY
    }
  });
});

// HEALTH (Root path alias)
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "paralelismo-profetico",
    env: "vercel-serverless",
    path: "/health"
  });
});

// PARALLELISM POST
app.post("/api/parallelism", async (req, res) => {
  try {
    const { category, customSearch, refresh } = req.body || {};
    const result = await generateGlobalParallelism({
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

    const result = await generateGlobalParallelism({
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

// COMPARE (AI Provider Layer: Groq -> Gemini -> Fallback)
app.post("/api/compare", async (req, res) => {
  try {
    const { query, customTopic } = req.body;
    const userPrompt = (query || customTopic || "Venezuela noticias recientes y su relacion con la Biblia").trim();

    const result = await getAIComparison(userPrompt);
    return res.json(result);

  } catch (err: unknown) {
    console.error("Error in /api/compare:", err);
    return res.status(500).json({ error: "Error interno de IA" });
  }
});

export default app;
