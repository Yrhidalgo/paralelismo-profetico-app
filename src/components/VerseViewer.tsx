import React, { useState } from 'react';
import { BIBLICAL_VERSES_FOR_TRIALS } from '../data/parallels';
import { BookOpen, Copy, Check, Sparkles, Heart, Zap, Flame } from 'lucide-react';
import { AdMobBanner } from './AdMobBanner';

export const VerseViewer: React.FC = () => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopyVerse = (verse: { verse: string; text: string; category: string }, idx: number) => {
    const text = `"${verse.text}" — ${verse.verse} (${verse.category})`;
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2500);
  };

  const getCategoryGradient = (category: string) => {
    switch (category.toLowerCase()) {
      case 'esperanza':
        return {
          gradient: 'from-cyan-400 to-blue-500',
          badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
          border: 'border-cyan-500/30 hover:border-cyan-400',
          accent: 'text-cyan-400',
          quoteBorder: 'border-cyan-400'
        };
      case 'paciencia':
      case 'fe':
        return {
          gradient: 'from-amber-400 to-orange-500',
          badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
          border: 'border-amber-500/30 hover:border-amber-400',
          accent: 'text-amber-400',
          quoteBorder: 'border-amber-400'
        };
      case 'justicia':
        return {
          gradient: 'from-rose-500 to-pink-500',
          badge: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
          border: 'border-rose-500/30 hover:border-rose-400',
          accent: 'text-rose-400',
          quoteBorder: 'border-rose-400'
        };
      case 'provisión':
      case 'solidaridad':
        return {
          gradient: 'from-emerald-400 to-teal-500',
          badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
          border: 'border-emerald-500/30 hover:border-emerald-400',
          accent: 'text-emerald-400',
          quoteBorder: 'border-emerald-400'
        };
      default:
        return {
          gradient: 'from-fuchsia-400 to-purple-500',
          badge: 'bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/30',
          border: 'border-fuchsia-500/30 hover:border-fuchsia-400',
          accent: 'text-fuchsia-400',
          quoteBorder: 'border-fuchsia-400'
        };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Intro Frosted Glass Gray Bento Box */}
      <div className="relative rounded-2xl sm:rounded-3xl p-[1px] bg-gradient-to-r from-emerald-400/40 via-cyan-500/40 to-fuchsia-500/40 shadow-2xl">
        <div className="bg-[#12121c]/85 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-7 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-wider bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-emerald-400" />
              <span>PALABRA DE CONSUELO & FE ACTIVA</span>
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl md:text-4xl font-black font-display text-white">
            Pasajes Bíblicos de <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">Fortaleza y Esperanza</span>
          </h2>
          
          <div className="bg-zinc-900/60 backdrop-blur-md border border-white/10 rounded-xl p-3.5 sm:p-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
            Versículos bíblicos seleccionados con sabiduría milenaria que brindan consuelo, resiliencia y fe inquebrantable a las familias dentro y fuera de Venezuela en tiempos de prueba y transformación.
          </div>
        </div>
      </div>

      {/* Verses Grid with Frosted Glass Gray Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {BIBLICAL_VERSES_FOR_TRIALS.slice(0, 2).map((v, idx) => {
          const style = getCategoryGradient(v.category);
          return (
            <div
              key={idx}
              className={`group bg-[#13131f]/85 backdrop-blur-xl border ${style.border} rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-all duration-300 shadow-xl flex flex-col justify-between hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] relative overflow-hidden`}
            >
              {/* Card top glow accent */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${style.gradient} opacity-70 group-hover:opacity-100`} />

              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className={`px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest rounded-lg border ${style.badge} flex items-center gap-1`}>
                    <Flame className="w-2.5 h-2.5" />
                    {v.category}
                  </span>
                  <button
                    onClick={() => handleCopyVerse(v, idx)}
                    className="p-2 text-zinc-400 hover:text-white bg-[#1c1c2b]/90 hover:bg-[#252538] border border-white/10 hover:border-cyan-400/40 rounded-xl transition-all active:scale-90"
                    title="Copiar versículo"
                  >
                    {copiedIdx === idx ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-zinc-300" />}
                  </button>
                </div>

                {/* Frosted Glass Gray Quote Container */}
                <div className={`bg-[#181826]/75 backdrop-blur-md border border-white/10 ${style.quoteBorder} border-l-3 rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-4 shadow-inner`}>
                  <blockquote className="italic text-zinc-100 text-sm sm:text-base leading-relaxed font-light">
                    "{v.text}"
                  </blockquote>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                <span className={`font-bold ${style.accent} flex items-center gap-1.5`}>
                  <BookOpen className="w-3.5 h-3.5" />
                  {v.verse}
                </span>
                <span className="text-[10px] text-zinc-400 flex items-center gap-1 uppercase tracking-widest">
                  <Sparkles className={`w-3 h-3 ${style.accent}`} />
                  Sagradas Escrituras
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* AdMob Banner - Mitad de la Pantalla */}
      <AdMobBanner 
        adUnitId="ca-app-pub-2559338430231736/6882475219" 
        section="midpage" 
        sectionLabel="Versículos de Esperanza" 
        positionLabel="Mitad de Pantalla" 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {BIBLICAL_VERSES_FOR_TRIALS.slice(2).map((v, idx) => {
          const actualIdx = idx + 2;
          const style = getCategoryGradient(v.category);
          return (
            <div
              key={actualIdx}
              className={`group bg-[#13131f]/85 backdrop-blur-xl border ${style.border} rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-all duration-300 shadow-xl flex flex-col justify-between hover:shadow-[0_0_30px_rgba(217,70,239,0.15)] relative overflow-hidden`}
            >
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${style.gradient} opacity-70 group-hover:opacity-100`} />

              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className={`px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest rounded-lg border ${style.badge} flex items-center gap-1`}>
                    <Heart className="w-2.5 h-2.5" />
                    {v.category}
                  </span>
                  <button
                    onClick={() => handleCopyVerse(v, actualIdx)}
                    className="p-2 text-zinc-400 hover:text-white bg-[#1c1c2b]/90 hover:bg-[#252538] border border-white/10 hover:border-cyan-400/40 rounded-xl transition-all active:scale-90"
                    title="Copiar versículo"
                  >
                    {copiedIdx === actualIdx ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-zinc-300" />}
                  </button>
                </div>

                {/* Frosted Glass Gray Quote Container */}
                <div className={`bg-[#181826]/75 backdrop-blur-md border border-white/10 ${style.quoteBorder} border-l-3 rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-4 shadow-inner`}>
                  <blockquote className="italic text-zinc-100 text-sm sm:text-base leading-relaxed font-light">
                    "{v.text}"
                  </blockquote>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                <span className={`font-bold ${style.accent} flex items-center gap-1.5`}>
                  <BookOpen className="w-3.5 h-3.5" />
                  {v.verse}
                </span>
                <span className="text-[10px] text-zinc-400 flex items-center gap-1 uppercase tracking-widest">
                  <Sparkles className={`w-3 h-3 ${style.accent}`} />
                  Sagradas Escrituras
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};


