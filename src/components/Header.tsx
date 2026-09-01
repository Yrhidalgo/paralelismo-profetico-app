import React from 'react';
import { BookOpen, Newspaper, Sparkles, Compass, Search, Clock, Globe, Zap } from 'lucide-react';
import propheticEmblem from '../assets/images/prophetic_emblem_logo_1788112350378.jpg';

interface HeaderProps {
  activeTab: 'parallelism' | 'parallels' | 'ai-analyzer' | 'matrix' | 'verses' | 'future-projection' | 'scratch';
  setActiveTab: (tab: 'parallelism' | 'parallels' | 'ai-analyzer' | 'matrix' | 'verses' | 'future-projection' | 'scratch') => void;
  onOpenQuickSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenQuickSearch }) => {
  const tabs = [
    {
      id: 'parallelism' as const,
      label: 'Feed Global',
      badge: 'LIVE',
      badgeColor: 'from-cyan-500 to-blue-500',
      icon: Globe,
    },
    {
      id: 'parallels' as const,
      label: 'Biblioteca',
      badge: 'TOP',
      badgeColor: 'from-amber-400 to-orange-500',
      icon: Compass,
    },
    {
      id: 'ai-analyzer' as const,
      label: 'IA Studio',
      badge: 'GEMINI',
      badgeColor: 'from-fuchsia-500 to-pink-500',
      icon: Sparkles,
    },
    {
      id: 'matrix' as const,
      label: 'Matriz Comparativa',
      badge: 'DATA',
      badgeColor: 'from-purple-500 to-indigo-500',
      icon: Newspaper,
    },
    {
      id: 'verses' as const,
      label: 'Palabra & Fe',
      badge: 'ESCRITURAS',
      badgeColor: 'from-emerald-400 to-teal-500',
      icon: BookOpen,
    },
    {
      id: 'future-projection' as const,
      label: 'Proyecciones',
      badge: 'RADAR',
      badgeColor: 'from-rose-500 to-pink-600',
      icon: Clock,
    },
    {
      id: 'scratch' as const,
      label: 'Scratch',
      badge: 'TEST',
      badgeColor: 'from-zinc-500 to-zinc-700',
      icon: Zap,
    },
  ];

  return (
    <header className="bg-[#07070a]/90 border-b border-white/10 text-[#f3f4f6] sticky top-0 z-40 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      {/* Top Ambient Cyber Gradient Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 via-amber-400 to-emerald-400 opacity-90 animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
          
          {/* Brand & Subtitle with Neon Emblem */}
          <div className="flex items-center gap-3.5 sm:gap-5">
            <div className="shrink-0 relative group cursor-pointer">
              {/* Neon Glow Aura */}
              <div className="absolute -inset-1.5 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-amber-500 blur-lg opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
              
              <div className="relative w-13 h-13 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-cyan-400/70 bg-[#0d0d14] p-0.5 shadow-2xl transition-transform duration-300 group-hover:scale-105">
                <img
                  src={propheticEmblem}
                  alt="Emblema Paralelismo Profético"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
                />
              </div>
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 text-cyan-300 border border-cyan-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                  <Zap className="w-2.5 h-2.5 text-amber-400" />
                  <span>Gen Z Biblical Analysis</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono text-zinc-500">v2.5 Live</span>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight font-display flex items-center gap-1.5">
                <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">PARALELOS</span>
                <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                  PROFÉTICOS
                </span>
              </h1>
              <p className="text-[10.5px] sm:text-xs text-zinc-400 font-light truncate max-w-xl">
                Actualidad Mundial, Economía & Sociedad frente a la revelación bíblica
              </p>
            </div>
          </div>

          {/* Quick AI Search Button */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 w-full sm:w-auto">
            <button
              onClick={onOpenQuickSearch}
              className="w-full sm:w-auto relative group overflow-hidden rounded-xl p-[1px] font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:shadow-[0_0_25px_rgba(236,72,153,0.4)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-amber-400 group-hover:opacity-100 opacity-80 transition-opacity" />
              <span className="relative flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#0d0d14] text-white group-hover:bg-[#12121e] transition-colors">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
                <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent font-bold">
                  CONSULTAR IA
                </span>
                <span className="bg-white/10 px-1.5 py-0.5 rounded text-[9px] font-mono text-zinc-300 hidden sm:inline">⚡</span>
              </span>
            </button>
          </div>
        </div>

        {/* Gen Z Neon Pills Navigation */}
        <nav className="flex items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 pt-2.5 border-t border-white/5 overflow-x-auto no-scrollbar pb-0.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wide uppercase transition-all duration-300 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-black shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-[1.02]'
                    : 'text-zinc-400 hover:text-white bg-[#12121a]/80 hover:bg-[#1a1a26] border border-white/5 hover:border-cyan-500/30'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 animate-gradient" />
                )}
                
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-cyan-400 group-hover:scale-110 transition-transform'}`} />
                  <span>{tab.label}</span>
                  <span
                    className={`text-[8px] font-extrabold px-1.5 py-0.2 rounded-full tracking-wider ${
                      isActive
                        ? 'bg-black/20 text-black'
                        : `bg-gradient-to-r ${tab.badgeColor} text-black`
                    }`}
                  >
                    {tab.badge}
                  </span>
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};


