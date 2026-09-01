import dotenv from "dotenv";
import { getAIComparison } from "./server/aiProvider.js";

dotenv.config();

async function checkConnection() {
  console.log("=== Comprobando Conexión con IA ===");

  const groqKey = process.env.GROQ_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  console.log("GROQ_API_KEY detectada:", !!groqKey);
  console.log("GEMINI_API_KEY detectada:", !!geminiKey);

  if (!groqKey && !geminiKey) {
    console.error("❌ ERROR: No se detectó ninguna clave de API localmente.");
    console.log("Asegúrate de tener un archivo .env en la raíz con:");
    console.log("GROQ_API_KEY=tu_clave");
    console.log("GEMINI_API_KEY=tu_clave");
    return;
  }

  try {
    const result = await getAIComparison("Hola, ¿estás conectado?");
    const isFallback = result.analysis.includes("Análisis para");

    if (isFallback && result.analysis.includes("En la actualidad")) {
        // This check might be tricky if the AI actually starts with those words.
        // But the fallback in aiProvider.ts is very specific.
        console.log("⚠️  AVISO: Se recibió una respuesta, pero parece ser el fallback estático.");
    } else {
        console.log("✅ ÉXITO: Conexión establecida correctamente.");
        console.log("Proveedor utilizado:", result.timestamp ? "Dinámico" : "Desconocido");
    }
  } catch (error: any) {
    console.error("❌ ERROR CRÍTICO:", error.message);
  }
}

checkConnection();
