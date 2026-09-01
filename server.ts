import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { generateGlobalParallelism } from "./server/parallelism.js";
import { scrapeGlobalNews } from "./server/scraper.js";
import { getAIComparison } from "./server/aiProvider.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// API endpoint for Global News Scraper & Biblical Parallelism Engine (No geographic boundary)
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
    const errorMessage = err instanceof Error ? err.message : "Error interno al procesar paralelismos";
    return res.status(500).json({ error: errorMessage });
  }
});

// Also support GET for fast polling or pre-fetching
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

    const resultPayload = await getAIComparison(userPrompt);

    compareCache.set(cacheKey, { data: resultPayload, expiry: Date.now() + 5 * 60 * 1000 });
    return res.json(resultPayload);

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
