import React, { useState, useEffect } from 'react';
import { getApiUrl } from '../config';
import { AIAnalysisResponse } from '../types';
import { 
  Sparkles, 
  Search, 
  Loader2, 
  BookOpen, 
  Newspaper, 
  ExternalLink, 
  Copy, 
  Check, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { AdMobBanner } from './AdMobBanner';

interface AILiveAnalyzerProps {
  initialTopic?: string;
  onClearInitialTopic?: () => void;
}

const PRESET_QUERIES = [
  'Éxodo por el Darién vs la travesía del desierto en el libro de Éxodo',
  'Hiperinflación y salario mínimo en Venezuela comparado con Apocalipsis 6:6 y Hageo',
  'Detenciones de líderes y protestas del 28J vs la persecución de profetas en el Antiguo Testamento',
  'Las ollas comunitarias y comedores en Venezuela vs la Iglesia Primitiva en Hechos 2',
  'El regreso de los exiliados venezolanos y la reconstrucción con Nehemías'
];

export const AILiveAnalyzer: React.FC<AILiveAnalyzerProps> = ({ initialTopic }) => {
  const [query, setQuery] = useState(initialTopic || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialTopic) {
      setQuery(initialTopic);
      handleAnalyze(initialTopic);
    }
  }, [initialTopic]);

  const handleAnalyze = async (searchQuery?: string) => {
    const q = searchQuery || query;
    if (!q.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(getApiUrl('/api/compare'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });

      if (!res.ok) {
        throw new Error('Error al conectar con el servidor de análisis.');
      }

      const data: AIAnalysisResponse = await res.json();
      setResult(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'No se pudo generar el análisis en este momento.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `ANÁLISIS BÍBLICO E HISTÓRICO DE VENEZUELA: "${query}"

ANÁLISIS:
${result.analysis}

PASAJES BÍBLICOS:
${result.biblicalVerses.map(v => `- ${v.reference}: "${v.text}" (${v.application})`).join('\n')}

NOTICIAS VENEZUELA:
${result.newsSummary}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Search Input Box Bento Card */}
      <div className="relative rounded-2xl sm:rounded-3xl p-[1px] bg-gradient-to-r from-cyan-500/40 via-fuchsia-500/40 to-amber-500/40 shadow-2xl">
        <div className="bg-[#0b0b14]/95 rounded-2xl sm:rounded-3xl p-5 sm:p-7 space-y-4 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs uppercase tracking-widest font-extrabold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>ANALIZADOR IA EN VIVO • GEMINI ENGINE</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-black font-display text-white">
            Consulte cualquier acontecimiento global, económico o <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">Bíblico</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 font-light">
            Ingrese un evento noticioso reciente, una inquietud espiritual o un pasaje específico para obtener una comparación teológica e histórica instantánea con IA.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); handleAnalyze(); }} className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ej. La crisis inflacionaria, la migración o las pruebas en el desierto..."
                className="w-full bg-[#12121e] border border-white/10 focus:border-cyan-400 text-white placeholder-zinc-500 text-xs sm:text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 hover:from-cyan-300 hover:to-amber-200 disabled:bg-[#1a1a26] disabled:text-zinc-500 text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] shrink-0 active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>Analizando...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Analizar</span>
                </>
              )}
            </button>
          </form>

          {/* Preset Prompt Chips */}
          <div className="pt-4 border-t border-white/5 space-y-2">
            <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">⚡ Consultas Recomendadas:</span>
            <div className="flex flex-wrap gap-2">
              {PRESET_QUERIES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setQuery(preset);
                    handleAnalyze(preset);
                  }}
                  className="text-xs font-mono bg-[#141424] hover:bg-[#1f1f38] text-zinc-300 hover:text-cyan-300 border border-white/5 hover:border-cyan-500/30 rounded-xl px-3 py-1.5 transition-all text-left active:scale-95"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AdMob Banner - Mitad de la Pantalla */}
      <AdMobBanner 
        adUnitId="ca-app-pub-2559338430231736/6882475219" 
        section="midpage" 
        sectionLabel="Consulta Libre IA" 
        positionLabel="Mitad de Pantalla" 
      />

      {/* Error Message */}
      {error && (
        <div className="bg-rose-950/30 border border-rose-500/30 text-rose-300 p-4 rounded-2xl flex items-center gap-3 text-xs font-mono">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="bg-[#161618] border border-white/5 rounded-2xl p-6 sm:p-8 space-y-6 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#26262a] rounded-full" />
            <div className="h-4 bg-[#26262a] rounded w-1/3" />
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-[#26262a] rounded w-full" />
            <div className="h-4 bg-[#26262a] rounded w-5/6" />
            <div className="h-4 bg-[#26262a] rounded w-4/6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-28 bg-[#26262a] rounded-xl" />
            <div className="h-28 bg-[#26262a] rounded-xl" />
          </div>
        </div>
      )}

      {/* Analysis Result Display Bento Container */}
      {result && !loading && (
        <div className="bg-[#161618] border border-white/5 rounded-2xl p-6 sm:p-8 space-y-8 shadow-2xl">
          
          {/* Result Header & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 rounded-lg">
                ⚡ ESTUDIO GENERADO
              </span>
              <h3 className="text-lg sm:text-2xl font-display font-bold text-white mt-2">
                {query}
              </h3>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-bold uppercase tracking-wider bg-[#141424] hover:bg-[#1f1f38] text-cyan-300 border border-cyan-500/30 rounded-xl transition-all active:scale-95 shadow-sm"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
                <span>{copied ? 'COPIADO' : 'COPIAR'}</span>
              </button>
            </div>
          </div>

          {/* Main Analysis Paragraphs */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Análisis Teológico e Histórico Integrado</span>
            </h4>
            <div className="text-xs sm:text-sm text-zinc-200 leading-relaxed whitespace-pre-line bg-[#0e0e18]/90 border border-white/10 p-5 rounded-2xl font-light">
              {result.analysis}
            </div>
          </div>

          {/* Biblical Verses Cards */}
          {result.biblicalVerses && result.biblicalVerses.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Pasajes Bíblicos de Referencia</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.biblicalVerses.map((verse, idx) => (
                  <div key={idx} className="bg-[#0e0e18]/90 border border-cyan-500/30 hover:border-cyan-400/50 rounded-2xl p-4 sm:p-5 space-y-2.5 transition-colors shadow-md">
                    <span className="text-xs font-mono font-bold text-cyan-300 block">
                      📖 {verse.reference}
                    </span>
                    <blockquote className="italic text-xs text-zinc-200 border-l-2 border-cyan-400 pl-3 leading-relaxed bg-[#141424] py-1 rounded-r-lg">
                      "{verse.text}"
                    </blockquote>
                    <p className="text-xs text-zinc-300">
                      <strong className="text-cyan-300 font-mono text-[11px] uppercase tracking-wider block mb-0.5">Aplicación: </strong>
                      {verse.application}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* News Context Summary */}
          {result.newsSummary && (
            <div className="bg-gradient-to-r from-[#0d0d16] to-[#121222] border border-white/10 rounded-2xl p-5 space-y-2 shadow-md">
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-fuchsia-400 flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-fuchsia-400" />
                <span>Resumen de Hechos Relevantes</span>
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                {result.newsSummary}
              </p>
            </div>
          )}

          {/* Grounding Sources (Google Search) */}
          {result.groundingSources && result.groundingSources.length > 0 && (
            <div className="pt-4 border-t border-white/5 space-y-2">
              <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">⚡ Fuentes y Referencias Noticiosas:</span>
              <div className="flex flex-wrap gap-2">
                {result.groundingSources.map((source, idx) => (
                  <a
                    key={idx}
                    href={source.uri}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-[#12121e] hover:bg-[#1a1a2e] text-cyan-300 hover:text-cyan-200 border border-white/10 hover:border-cyan-500/30 rounded-xl transition-all"
                  >
                    <span>{source.title}</span>
                    <ExternalLink className="w-3 h-3 shrink-0 text-cyan-400" />
                  </a>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};

