import React, { useState } from 'react';
import { BiblicalParallel } from '../types';
import { 
  X, 
  BookOpen, 
  Sun, 
  Moon, 
  Type, 
  Sparkles, 
  Quote, 
  Newspaper, 
  Copy, 
  Check, 
  Printer 
} from 'lucide-react';

interface ReadingModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  parallel: BiblicalParallel;
  onExploreWithAI?: (topic: string) => void;
}

export const ReadingModeModal: React.FC<ReadingModeModalProps> = ({
  isOpen,
  onClose,
  parallel,
  onExploreWithAI
}) => {
  const [theme, setTheme] = useState<'parchment' | 'darkParchment'>('parchment');
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('lg');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyFull = () => {
    const text = `PARALELO BÍBLICO Y VENEZUELA: ${parallel.title}
Tema: ${parallel.theme}

PASAJE BÍBLICO (${parallel.biblicalPassage.reference}):
"${parallel.biblicalPassage.text}"
Contexto: ${parallel.biblicalPassage.context}

NOTICIA: ${parallel.venezuelaNewsContext.headline}
Medios: ${parallel.venezuelaNewsContext.mediaSources.join(', ')}
${parallel.venezuelaNewsContext.summary}

ANÁLISIS DEL PARALELO:
${parallel.parallelAnalysis}

REFLEXIÓN ESPIRITUAL:
${parallel.reflection}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Font size styling mappings
  const textSizeClasses = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-relaxed',
    lg: 'text-lg leading-loose',
    xl: 'text-xl leading-loose'
  };

  const quoteSizeClasses = {
    sm: 'text-base leading-relaxed',
    base: 'text-lg leading-relaxed',
    lg: 'text-xl leading-loose',
    xl: 'text-2xl leading-loose'
  };

  // Theme styles
  const isParchment = theme === 'parchment';

  const bgCanvas = isParchment ? 'bg-[#f5f0e6]' : 'bg-[#0a0a10]';
  const textColor = isParchment ? 'text-[#2b261f]' : 'text-[#f1f5f9]';
  const subTextColor = isParchment ? 'text-[#615647]' : 'text-[#94a3b8]';
  const accentColor = isParchment ? 'text-[#8c6b2d]' : 'text-cyan-400';
  const borderAccent = isParchment ? 'border-[#8c6b2d]/40' : 'border-cyan-500/40';
  const boxBg = isParchment ? 'bg-[#ebe3d5]/70 border-[#d9cdb8]' : 'bg-[#161626]/80 backdrop-blur-xl border-white/10';
  const quoteBg = isParchment ? 'bg-[#e3d7c3]/80' : 'bg-[#18182c]/85 backdrop-blur-xl';

  return (
    <div 
      className={`fixed inset-0 z-50 overflow-y-auto ${bgCanvas} transition-colors duration-300 animate-fade-in`}
      tabIndex={-1}
    >
      {/* Top Floating Control Bar */}
      <header className={`sticky top-0 z-10 ${bgCanvas}/90 backdrop-blur-xl border-b ${isParchment ? 'border-[#d9cdb8]' : 'border-white/10'} py-3 px-4 sm:px-8 flex items-center justify-between gap-3 shadow-md`}>
        
        {/* Title / Indicator */}
        <div className="flex items-center gap-2 font-display italic text-sm sm:text-base">
          <BookOpen className={`w-4 h-4 ${accentColor}`} />
          <span className={`font-semibold ${textColor}`}>
            Modo Lectura Profunda
          </span>
          <span className={`hidden sm:inline text-xs font-mono font-normal ${subTextColor}`}>
            — {parallel.theme}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 sm:gap-2 font-mono text-xs">
          
          {/* Font Size Selector */}
          <div className={`flex items-center border ${isParchment ? 'border-[#d9cdb8] bg-[#ebe3d5]' : 'border-white/10 bg-[#161624]'} rounded-xl p-0.5`}>
            <button
              onClick={() => setFontSize('sm')}
              className={`px-2 py-1 rounded-lg transition-colors ${fontSize === 'sm' ? (isParchment ? 'bg-[#f5f0e6] font-bold text-black' : 'bg-cyan-500/20 font-bold text-cyan-300') : subTextColor}`}
              title="Texto Pequeño"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('base')}
              className={`px-2 py-1 rounded-lg transition-colors ${fontSize === 'base' ? (isParchment ? 'bg-[#f5f0e6] font-bold text-black' : 'bg-cyan-500/20 font-bold text-cyan-300') : subTextColor}`}
              title="Texto Mediano"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('lg')}
              className={`px-2 py-1 rounded-lg transition-colors ${fontSize === 'lg' ? (isParchment ? 'bg-[#f5f0e6] font-bold text-black' : 'bg-cyan-500/20 font-bold text-cyan-300') : subTextColor}`}
              title="Texto Grande"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xl')}
              className={`px-2 py-1 rounded-lg transition-colors ${fontSize === 'xl' ? (isParchment ? 'bg-[#f5f0e6] font-bold text-black' : 'bg-cyan-500/20 font-bold text-cyan-300') : subTextColor}`}
              title="Texto Muy Grande"
            >
              A++
            </button>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(isParchment ? 'darkParchment' : 'parchment')}
            className={`p-2 rounded-xl border transition-colors flex items-center gap-1 ${
              isParchment 
                ? 'bg-[#ebe3d5] border-[#d9cdb8] text-[#2b261f] hover:bg-[#e3d7c3]' 
                : 'bg-[#161624] border-white/10 text-cyan-300 hover:bg-[#202034]'
            }`}
            title="Cambiar Tema de Lectura"
          >
            {isParchment ? <Moon className="w-4 h-4 text-[#8c6b2d]" /> : <Sun className="w-4 h-4 text-cyan-400" />}
            <span className="hidden md:inline text-[11px] font-semibold">
              {isParchment ? 'Modo Oscuro Cyber' : 'Modo Pergamino'}
            </span>
          </button>

          {/* Copy Full Text */}
          <button
            onClick={handleCopyFull}
            className={`p-2 rounded-xl border transition-colors ${
              isParchment 
                ? 'bg-[#ebe3d5] border-[#d9cdb8] text-[#2b261f] hover:bg-[#e3d7c3]' 
                : 'bg-[#161624] border-white/10 text-zinc-300 hover:bg-[#202034]'
            }`}
            title="Copiar Texto Completo"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          {/* Print / Export */}
          <button
            onClick={handlePrint}
            className={`hidden sm:flex p-2 rounded-xl border transition-colors ${
              isParchment 
                ? 'bg-[#ebe3d5] border-[#d9cdb8] text-[#2b261f] hover:bg-[#e3d7c3]' 
                : 'bg-[#161624] border-white/10 text-zinc-300 hover:bg-[#202034]'
            }`}
            title="Imprimir / Guardar en PDF"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Exit Reading Mode */}
          <button
            onClick={onClose}
            className={`p-2 rounded-xl border font-bold transition-colors ${
              isParchment
                ? 'bg-[#8c6b2d] border-[#735622] text-white hover:bg-[#735622]'
                : 'bg-cyan-400 border-cyan-300 text-black hover:bg-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
            }`}
            title="Cerrar Modo Lectura (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Parchment Content Body */}
      <main className="max-w-3xl mx-auto px-6 py-10 sm:py-16 space-y-12">
        
        {/* Title Header */}
        <div className="text-center space-y-4 pb-8 border-b border-current/15">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest border border-current/20">
            <Sparkles className={`w-3.5 h-3.5 ${accentColor}`} />
            <span>ESTUDIO PARALELO: {parallel.theme}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif italic tracking-tight font-medium leading-tight">
            {parallel.title}
          </h1>

          <p className={`text-xs sm:text-sm font-serif italic ${subTextColor} max-w-xl mx-auto`}>
            Paralelismo teológico e histórico entre los relatos bíblicos y la realidad contemporánea de Venezuela.
          </p>
        </div>

        {/* Section 1: Sacred Scriptures */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-bold">
            <span className={`w-3 h-0.5 ${isParchment ? 'bg-[#8c6b2d]' : 'bg-[#d4af37]'}`} />
            <span className={accentColor}>I. Pasaje de las Sagradas Escrituras</span>
          </div>

          <div className="font-serif italic text-2xl sm:text-3xl font-medium">
            {parallel.biblicalPassage.reference}
          </div>

          {/* Biblical Event Illustration in Parchment style */}
          {parallel.biblicalPassage.imageUrl && (
            <div className={`relative rounded-2xl overflow-hidden border ${isParchment ? 'border-[#d9cdb8] shadow-md' : 'border-[#332f2a] shadow-2xl'} my-4 group`}>
              <img
                src={parallel.biblicalPassage.imageUrl}
                alt={parallel.biblicalPassage.imageCaption || parallel.title}
                className="w-full h-44 sm:h-64 md:h-72 object-cover object-center transform group-hover:scale-[1.01] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs font-mono text-white/90">
                <span className="text-[#d4af37] font-serif italic truncate max-w-[85%]">
                  {parallel.biblicalPassage.imageCaption || 'Representación Bíblica'}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-zinc-300 font-mono shrink-0">
                  Sagradas Escrituras
                </span>
              </div>
            </div>
          )}

          {/* Main Scripture Callout */}
          <blockquote className={`p-6 sm:p-8 rounded-2xl border-l-4 ${borderAccent} ${quoteBg} shadow-inner font-serif italic ${quoteSizeClasses[fontSize]} leading-relaxed relative`}>
            <Quote className={`w-8 h-8 opacity-20 absolute top-4 right-4 ${accentColor}`} />
            "{parallel.biblicalPassage.text}"
          </blockquote>

          <div className={`p-5 rounded-2xl border ${boxBg} font-serif ${textSizeClasses[fontSize]} space-y-2`}>
            <h3 className={`text-xs font-mono uppercase tracking-wider font-bold ${accentColor}`}>
              Contexto Histórico y Teológico:
            </h3>
            <p className={textColor}>
              {parallel.biblicalPassage.context}
            </p>
          </div>

          {parallel.keyQuotes?.biblical && (
            <div className={`italic text-xs sm:text-sm ${subTextColor} border-l-2 ${borderAccent} pl-3 font-serif`}>
              Cita Clave: "{parallel.keyQuotes.biblical}"
            </div>
          )}
        </section>

        {/* Section Divider */}
        <div className="flex items-center justify-center gap-2 opacity-30 my-8">
          <span className="w-12 h-px bg-current" />
          <span className="text-xs font-serif italic">❖</span>
          <span className="w-12 h-px bg-current" />
        </div>

        {/* Section 2: Venezuela Contemporary Context */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-bold">
            <Newspaper className={`w-4 h-4 ${accentColor}`} />
            <span className={accentColor}>II. Contexto y Reportes en Venezuela</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold leading-snug">
            {parallel.venezuelaNewsContext.headline}
          </h2>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className={subTextColor}>Fuentes Periodísticas:</span>
            {parallel.venezuelaNewsContext.mediaSources.map((source, i) => (
              <span key={i} className={`px-2.5 py-0.5 rounded-lg border text-[11px] ${boxBg}`}>
                {source}
              </span>
            ))}
          </div>

          {/* Contemporary Event Illustration in Reading Mode */}
          {parallel.venezuelaNewsContext.imageUrl && (
            <div className={`relative rounded-2xl overflow-hidden border ${isParchment ? 'border-[#d9cdb8] shadow-md' : 'border-[#332f2a] shadow-2xl'} my-4 group`}>
              <img
                src={parallel.venezuelaNewsContext.imageUrl}
                alt={parallel.venezuelaNewsContext.imageCaption || parallel.venezuelaNewsContext.headline}
                className={`w-full h-44 sm:h-64 md:h-72 object-cover object-center transform group-hover:scale-[1.01] transition-transform duration-500 ${parallel.venezuelaNewsContext.imageUrl === parallel.biblicalPassage.imageUrl ? 'grayscale brightness-[0.8] opacity-70' : ''}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs font-mono text-white/90">
                <span className="text-rose-400 font-serif italic truncate max-w-[85%]">
                  {parallel.venezuelaNewsContext.imageCaption || 'Representación Actual'}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-zinc-300 font-mono shrink-0">
                  Realidad Actual
                </span>
              </div>
            </div>
          )}

          <p className={`font-serif ${textSizeClasses[fontSize]} leading-relaxed ${textColor}`}>
            {parallel.venezuelaNewsContext.summary}
          </p>

          {/* Key Facts list in reading mode */}
          <div className={`p-6 rounded-2xl border ${boxBg} space-y-3 font-serif`}>
            <h3 className={`text-xs font-mono uppercase tracking-wider font-bold ${accentColor}`}>
              Hechos Documentados:
            </h3>
            <ul className="space-y-2">
              {parallel.venezuelaNewsContext.keyFacts.map((fact, idx) => (
                <li key={idx} className={`flex items-start gap-3 ${textSizeClasses[fontSize]}`}>
                  <span className={`w-2 h-2 rounded-full mt-2.5 shrink-0 ${isParchment ? 'bg-[#8c6b2d]' : 'bg-[#d4af37]'}`} />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section Divider */}
        <div className="flex items-center justify-center gap-2 opacity-30 my-8">
          <span className="w-12 h-px bg-current" />
          <span className="text-xs font-serif italic">❖</span>
          <span className="w-12 h-px bg-current" />
        </div>

        {/* Section 3: Deep Parallel Analysis */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-bold">
            <BookOpen className={`w-4 h-4 ${accentColor}`} />
            <span className={accentColor}>III. Análisis Profundo de Paralelismo</span>
          </div>

          <div className={`p-6 sm:p-8 rounded-2xl border ${boxBg} font-serif ${textSizeClasses[fontSize]} leading-relaxed space-y-4 shadow-sm`}>
            <p className={textColor}>
              {parallel.parallelAnalysis}
            </p>
          </div>
        </section>

        {/* Section 4: Spiritual Reflection & Faith */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-bold">
            <Sparkles className={`w-4 h-4 ${accentColor}`} />
            <span className={accentColor}>IV. Lección de Fe y Reflexión Final</span>
          </div>

          <div className={`p-6 sm:p-8 rounded-2xl border-2 ${borderAccent} ${quoteBg} font-serif ${textSizeClasses[fontSize]} leading-relaxed space-y-3`}>
            <p className={textColor}>
              {parallel.reflection}
            </p>
          </div>
        </section>

        {/* Footer Actions inside Reading Mode */}
        <div className="pt-10 border-t border-current/15 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <button
            onClick={onClose}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl border font-bold transition-all text-center ${
              isParchment
                ? 'bg-[#ebe3d5] border-[#d9cdb8] text-[#2b261f] hover:bg-[#e3d7c3]'
                : 'bg-[#1c1a17] border-[#332f2a] text-[#e6dfd5] hover:bg-[#282420]'
            }`}
          >
            ← Salir del Modo Lectura
          </button>

          {onExploreWithAI && (
            <button
              onClick={() => {
                onClose();
                onExploreWithAI(parallel.title);
              }}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg ${
                isParchment
                  ? 'bg-[#8c6b2d] text-white hover:bg-[#735622]'
                  : 'bg-[#d4af37] text-black hover:bg-[#b89628]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Analizar este Paralelo con IA Gemini</span>
            </button>
          )}
        </div>

      </main>
    </div>
  );
};
