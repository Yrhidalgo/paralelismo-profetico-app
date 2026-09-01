import React, { useState } from 'react';
import { BiblicalParallel } from '../types';
import { ReadingModeModal } from './ReadingModeModal';
import { 
  Compass, 
  TrendingUp, 
  Scale, 
  HeartHandshake, 
  Sparkles, 
  BookOpen, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Quote,
  Maximize2,
  Zap,
  Flame,
  Radio
} from 'lucide-react';

interface ParallelCardProps {
  parallel: BiblicalParallel;
  onExploreWithAI: (topic: string) => void;
}

export const ParallelCard: React.FC<ParallelCardProps> = ({ parallel, onExploreWithAI }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isReadingModeOpen, setIsReadingModeOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const getCategoryConfig = (category: string) => {
    switch (category) {
      case 'exodus':
        return {
          icon: Compass,
          gradient: 'from-cyan-400 to-blue-500',
          badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
          glow: 'group-hover:border-cyan-400/50',
          borderAccent: 'border-cyan-400',
          label: 'ÉXODO & DIÁSPORA',
        };
      case 'economy':
        return {
          icon: TrendingUp,
          gradient: 'from-rose-500 to-pink-500',
          badgeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
          glow: 'group-hover:border-rose-400/50',
          borderAccent: 'border-rose-400',
          label: 'HIPERINFLACIÓN & ECONOMÍA',
        };
      case 'justice':
        return {
          icon: Scale,
          gradient: 'from-amber-400 to-orange-500',
          badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
          glow: 'group-hover:border-amber-400/50',
          borderAccent: 'border-amber-400',
          label: 'OPRESIÓN & JUSTICIA',
        };
      case 'solidarity':
        return {
          icon: HeartHandshake,
          gradient: 'from-emerald-400 to-teal-500',
          badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
          glow: 'group-hover:border-emerald-400/50',
          borderAccent: 'border-emerald-400',
          label: 'SOLIDARIDAD & COMUNIDAD',
        };
      default:
        return {
          icon: Sparkles,
          gradient: 'from-fuchsia-400 to-purple-500',
          badgeBg: 'bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/30',
          glow: 'group-hover:border-fuchsia-400/50',
          borderAccent: 'border-fuchsia-400',
          label: 'RECONSTRUCCIÓN & FE',
        };
    }
  };

  const cat = getCategoryConfig(parallel.category);
  const Icon = cat.icon;

  const handleCopyText = () => {
    const fullText = `PARALELO BÍBLICO Y NOTICIAS: ${parallel.title}
Tema: ${parallel.theme}

[PASAJE BÍBLICO]: ${parallel.biblicalPassage.reference}
"${parallel.biblicalPassage.text}"

[NOTICIAS ACTUALIDAD]: ${parallel.venezuelaNewsContext.headline}
Fuentes: ${parallel.venezuelaNewsContext.mediaSources.join(', ')}
${parallel.venezuelaNewsContext.summary}

[ANÁLISIS]: ${parallel.parallelAnalysis}
[REFLEXIÓN]: ${parallel.reflection}`;

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <article className="group bg-[#0c0c14]/90 border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 hover:border-cyan-500/40 hover:shadow-[0_0_35px_rgba(6,182,212,0.15)] relative">
      {/* Top Accent Gradient Line */}
      <div className={`h-[2px] w-full bg-gradient-to-r ${cat.gradient} opacity-80 group-hover:opacity-100 transition-opacity`} />

      {/* Card Header */}
      <div className="p-4 sm:p-6 bg-[#11111c]/90 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="relative shrink-0 mt-0.5">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${cat.gradient} p-0.5 shadow-lg`}>
              <div className="w-full h-full bg-[#0d0d16] rounded-[14px] flex items-center justify-center">
                <Icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className={`px-2.5 py-0.5 text-[9.5px] sm:text-[10px] font-mono font-bold uppercase tracking-wider rounded-lg border ${cat.badgeBg} flex items-center gap-1`}>
                <Zap className="w-3 h-3 text-amber-400" />
                {cat.label}
              </span>
              <span className="text-[10px] font-mono text-zinc-500 uppercase">
                {parallel.theme}
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black font-display text-white tracking-tight group-hover:text-cyan-200 transition-colors">
              {parallel.title}
            </h2>
          </div>
        </div>

        {/* Card Controls */}
        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            onClick={() => setIsReadingModeOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider bg-[#171724] hover:bg-[#202032] text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 rounded-xl transition-all shadow-sm active:scale-95"
            title="Activar Modo Lectura Pergamino para Estudio Profundo"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden xs:inline sm:inline">Modo Lectura</span>
          </button>

          <button
            onClick={() => onExploreWithAI(parallel.title)}
            className="relative group/btn overflow-hidden rounded-xl p-[1px] font-mono text-xs font-bold uppercase tracking-wider active:scale-95 transition-all"
            title="Analizar a fondo con IA Gemini"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 opacity-90 group-hover/btn:opacity-100" />
            <span className="relative flex items-center gap-1.5 px-3 py-1.5 bg-[#0e0e18] text-white rounded-xl group-hover/btn:bg-transparent transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span className="hidden sm:inline">Profundizar IA</span>
            </span>
          </button>

          <button
            onClick={handleCopyText}
            className="p-2 text-zinc-400 hover:text-white bg-[#171724] hover:bg-[#202032] border border-white/5 hover:border-white/20 rounded-xl transition-all active:scale-90"
            title="Copiar resumen"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-zinc-400 hover:text-white bg-[#171724] hover:bg-[#202032] border border-white/5 hover:border-white/20 rounded-xl transition-all active:scale-90"
            title={isExpanded ? "Contraer" : "Expandir"}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
          
          {/* Dual Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            
            {/* Column 1: Biblical Context */}
            <div className="bg-[#0e0e18]/95 border border-cyan-500/20 hover:border-cyan-500/40 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                    <span className="text-[10px] font-mono uppercase tracking-widest font-extrabold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      Sagradas Escrituras
                    </span>
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-lg border border-cyan-500/20">
                    Relato Bíblico
                  </span>
                </div>

                {/* Biblical Event Illustration */}
                {parallel.biblicalPassage.imageUrl && (
                  <div className="relative rounded-xl overflow-hidden border border-cyan-500/30 bg-black/60 mb-3.5 group/img max-h-[145px] sm:max-h-[190px]">
                    <img
                      src={parallel.biblicalPassage.imageUrl}
                      alt={parallel.biblicalPassage.imageCaption || parallel.title}
                      className="w-full h-28 sm:h-36 md:h-40 object-cover object-center transform group-hover/img:scale-[1.02] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
                    <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-zinc-200">
                      <span className="text-cyan-300 font-medium truncate max-w-[85%]">
                        {parallel.biblicalPassage.imageCaption || 'Evento Bíblico Ilustrado'}
                      </span>
                      <span className="text-amber-400 text-[8.5px] uppercase tracking-wider shrink-0 hidden xs:inline-block">
                        Arte Bíblico
                      </span>
                    </div>
                  </div>
                )}

                <h3 className="text-base sm:text-lg font-bold font-display text-white mb-2 flex items-center gap-2">
                  <span className="text-cyan-400">📖</span>
                  <span>{parallel.biblicalPassage.reference}</span>
                </h3>

                <blockquote className="italic text-zinc-200 text-xs sm:text-sm bg-[#141424] border-l-3 border-cyan-400 p-3 rounded-r-xl mb-3 leading-relaxed">
                  "{parallel.biblicalPassage.text}"
                </blockquote>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  <strong className="text-zinc-200 font-medium">Contexto Histórico: </strong>
                  {parallel.biblicalPassage.context}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 text-[11px] font-mono text-cyan-300/90 flex items-center gap-2">
                <Quote className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
                <span className="truncate">{parallel.keyQuotes.biblical}</span>
              </div>
            </div>

            {/* Column 2: Contemporary News Context */}
            <div className="bg-[#141422]/95 border border-rose-500/20 hover:border-rose-500/40 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-xl transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-2.5 py-0.5 text-[9.5px] font-extrabold font-mono uppercase tracking-wider rounded-lg shadow-sm flex items-center gap-1">
                    <Radio className="w-2.5 h-2.5 animate-pulse" />
                    Noticia Relevante
                  </span>
                  <span className="text-zinc-400 text-[10px] font-mono">
                    Venezuela / Actualidad
                  </span>
                </div>

                {/* Contemporary Reality Illustration */}
                {parallel.venezuelaNewsContext.imageUrl && (
                  <div className="relative rounded-xl overflow-hidden border border-rose-500/30 bg-black/60 mb-3.5 group/modern max-h-[145px] sm:max-h-[190px]">
                    <img
                      src={parallel.venezuelaNewsContext.imageUrl}
                      alt={parallel.venezuelaNewsContext.imageCaption || parallel.title}
                      className={`w-full h-28 sm:h-36 md:h-40 object-cover object-center transform group-hover/modern:scale-[1.02] transition-transform duration-500 ${parallel.venezuelaNewsContext.imageUrl === parallel.biblicalPassage.imageUrl ? 'grayscale brightness-[0.8] opacity-70' : ''}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
                    <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-zinc-200">
                      <span className="text-rose-300 font-medium truncate max-w-[85%]">
                        {parallel.venezuelaNewsContext.imageCaption || 'Realidad Contemporánea'}
                      </span>
                      <span className="text-fuchsia-400 text-[8.5px] uppercase tracking-wider shrink-0 hidden xs:inline-block">
                        Hecho Actual
                      </span>
                    </div>
                  </div>
                )}

                <h3 className="text-base sm:text-lg font-bold font-display text-white mb-2 leading-snug group-hover:text-rose-200 transition-colors">
                  {parallel.venezuelaNewsContext.headline}
                </h3>
                
                {/* Media sources tags */}
                <div className="flex flex-wrap items-center gap-1.5 mb-3">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Medios:</span>
                  {parallel.venezuelaNewsContext.mediaSources.map((source, idx) => (
                    <span key={idx} className="px-2 py-0.5 text-[9.5px] font-mono bg-[#0c0c14] text-zinc-300 border border-white/10 rounded-md">
                      {source}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                  {parallel.venezuelaNewsContext.summary}
                </p>

                {/* Key Facts List */}
                <ul className="space-y-1.5">
                  {parallel.venezuelaNewsContext.keyFacts.map((fact, idx) => (
                    <li key={idx} className="text-xs text-zinc-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0 shadow-[0_0_6px_rgba(244,63,94,0.8)]" />
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-white/5 text-[11px] font-mono text-zinc-400 flex items-center gap-2">
                <Quote className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                <span className="truncate">{parallel.keyQuotes.contemporary}</span>
              </div>
            </div>

          </div>

          {/* Deep Parallel Analysis Bento Box */}
          <div className="bg-[#0a0a10] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                Análisis Teológico & Patrón Histórico
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
              {parallel.parallelAnalysis}
            </p>
          </div>

          {/* Spiritual Reflection Bento Box */}
          <div className="bg-gradient-to-r from-[#141424] to-[#1a1226] border border-fuchsia-500/30 rounded-2xl p-4 sm:p-5 space-y-2 shadow-lg">
            <div className="flex items-center gap-2 text-fuchsia-300">
              <Sparkles className="w-4 h-4 text-fuchsia-400 animate-spin-slow" />
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest bg-gradient-to-r from-fuchsia-300 to-pink-400 bg-clip-text text-transparent">
                Reflexión Espiritual & Esperanza
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-zinc-100 leading-relaxed">
              {parallel.reflection}
            </p>
          </div>

          {/* Reading Mode Launcher Bar */}
          <div className="pt-1 flex justify-end">
            <button
              onClick={() => setIsReadingModeOpen(true)}
              className="w-full sm:w-auto px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider bg-[#141424] hover:bg-[#1f1f38] text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md group/read active:scale-95"
            >
              <BookOpen className="w-4 h-4 text-cyan-400 group-hover/read:scale-110 transition-transform" />
              <span>Abrir en Modo Lectura Profunda (Pergamino)</span>
            </button>
          </div>

        </div>
      )}

      {/* Reading Mode Fullscreen Modal */}
      <ReadingModeModal
        isOpen={isReadingModeOpen}
        onClose={() => setIsReadingModeOpen(false)}
        parallel={parallel}
        onExploreWithAI={onExploreWithAI}
      />
    </article>
  );
};

