import React, { useState } from 'react';
import { Header } from './components/Header';
import { GlobalParallelismModule } from './components/GlobalParallelismModule';
import { ParallelCard } from './components/ParallelCard';
import { AILiveAnalyzer } from './components/AILiveAnalyzer';
import { ComparativeMatrix } from './components/ComparativeMatrix';
import { VerseViewer } from './components/VerseViewer';
import { FutureProjectionModule } from './components/FutureProjectionModule';
import { QuickSearchModal } from './components/QuickSearchModal';
import { AdMobBanner } from './components/AdMobBanner';
import { ThematicDiptych } from './components/ThematicDiptych';
import { ScratchStorage } from "scratch-storage";
import { BIBLICAL_PARALLELS } from './data/parallels';
import { BookOpen, Sparkles, Filter, Globe, Eye, Zap, Flame, Radio } from 'lucide-react';
import editorialParallelImg from './assets/images/prophetic_parallel_editorial_1788112269744.jpg';
import ScratchTest from './components/ScratchTest/ScratchTest';

export default function App() {
  const [activeTab, setActiveTab] = useState<'parallelism' | 'parallels' | 'ai-analyzer' | 'matrix' | 'verses' | 'future-projection' | 'scratch'>('parallelism');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [globalCategory, setGlobalCategory] = useState<string>('all');
  const [selectedTopicForAI, setSelectedTopicForAI] = useState<string>('');
  const [isQuickSearchOpen, setIsQuickSearchOpen] = useState(false);

  const handleExploreWithAI = (topic: string) => {
    setSelectedTopicForAI(topic);
    setActiveTab('ai-analyzer');
  };

  const handleRunQuickSearch = (query: string) => {
    setSelectedTopicForAI(query);
    setActiveTab('ai-analyzer');
  };

  const handleLibraryCategoryChange = (cat: string) => {
    setCategoryFilter(cat);
    setGlobalCategory(cat);
  };

  const handleFeedCategoryChange = (cat: string) => {
    setGlobalCategory(cat);
  };

  const filteredParallels = BIBLICAL_PARALLELS.filter((item) => {
    if (categoryFilter === 'all') return true;
    return item.category === categoryFilter;
  });

  return (
    <div className="min-h-screen bg-[#07070a] text-[#f3f4f6] flex flex-col font-sans selection:bg-cyan-400 selection:text-black relative overflow-x-hidden">
      
      {/* Background Ambient Cyber Meshes */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[350px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />
      <div className="fixed bottom-1/4 right-1/4 w-[450px] h-[350px] bg-fuchsia-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuickSearch={() => setIsQuickSearchOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-7 space-y-5 sm:space-y-7">
        
        {/* Gen Z Neon Hero Box */}
        <div className="relative rounded-2xl sm:rounded-3xl p-[1px] bg-gradient-to-r from-cyan-500/40 via-fuchsia-500/40 to-amber-500/40 shadow-[0_0_40px_rgba(6,182,212,0.12)]">
          <div className="bg-[#0b0b14]/95 rounded-2xl sm:rounded-3xl p-4 sm:p-7 relative overflow-hidden space-y-4 sm:space-y-6 backdrop-blur-xl">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
              <div className="space-y-2 sm:space-y-3 max-w-4xl">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>Estudio Comparativo Teológico & Hechos Globales</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/30">
                    <Flame className="w-2.5 h-2.5" />
                    <span>Live Stream</span>
                  </span>
                </div>

                <h2 className="text-xl sm:text-3xl md:text-4xl font-black font-display tracking-tight text-white leading-tight">
                  Paralelismos Bíblicos frente a la <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">Actualidad Global</span>
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                  Los grandes acontecimientos del mundo contemporáneo en economía, sociedad y finanzas —inflación monetaria, deuda global, crisis migratorias y clamor por justicia— reflejan patrones universales descritos en las Sagradas Escrituras.
                </p>
              </div>

              <div className="shrink-0 flex flex-row md:flex-col gap-2 sm:gap-3 w-full sm:w-auto">
                <button
                  id="btn-hero-paralelismo"
                  onClick={() => setActiveTab('parallelism')}
                  className="flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 text-black rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] text-center flex items-center justify-center gap-2 active:scale-95"
                >
                  <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-black" />
                  <span>Feed Global (En Vivo)</span>
                </button>

                <button
                  onClick={() => setActiveTab('ai-analyzer')}
                  className="flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider bg-[#141424] hover:bg-[#1f1f38] text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 rounded-xl transition-all text-center flex items-center justify-center gap-2 active:scale-95 shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0 animate-pulse" />
                  <span>Consulta Libre IA</span>
                </button>
              </div>
            </div>

            {/* Editorial Visual Diptych Frame (Dynamic) */}
            <ThematicDiptych
              category={globalCategory}
            />

          </div>
        </div>

        {/* TAB 0: Global News Scraper & Biblical Parallelism Engine (Inicio) */}
        {activeTab === 'parallelism' && (
          <div className="space-y-6">
            <GlobalParallelismModule
              onSelectTopicForDetailedAI={handleExploreWithAI}
              onCategoryChange={handleFeedCategoryChange}
            />
            {/* AdMob Banner (Inicio) - Debajo del contenido principal */}
            <AdMobBanner section="home" sectionLabel="Inicio" />
          </div>
        )}

        {/* TAB 1: Biblioteca / Paralelos Destacados */}
        {activeTab === 'parallels' && (
          <div className="space-y-6">
            
            {/* Gen Z Neon Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0d0d16] border border-white/10 p-3.5 sm:p-4 rounded-2xl shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
                <Filter className="w-4 h-4 text-cyan-400" />
                <span>FILTRAR CATEGORÍA:</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'all', label: 'Todos los Temas', color: 'from-cyan-400 to-blue-500' },
                  { id: 'exodus', label: 'Éxodo & Diáspora', color: 'from-cyan-400 to-teal-400' },
                  { id: 'economy', label: 'Hiperinflación & Carestía', color: 'from-rose-500 to-pink-500' },
                  { id: 'justice', label: 'Opresión & Justicia', color: 'from-amber-400 to-orange-500' },
                  { id: 'solidarity', label: 'Solidaridad & Comedores', color: 'from-emerald-400 to-teal-500' },
                  { id: 'hope', label: 'Reconstrucción & Esperanza', color: 'from-fuchsia-500 to-purple-500' },
                ].map((cat) => {
                  const isSelected = categoryFilter === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleLibraryCategoryChange(cat.id)}
                      className={`px-3 py-1.5 text-xs font-mono font-bold rounded-xl transition-all duration-300 active:scale-95 ${
                        isSelected
                          ? `bg-gradient-to-r ${cat.color} text-black shadow-[0_0_15px_rgba(6,182,212,0.35)] scale-[1.03]`
                          : 'bg-[#141422] text-zinc-300 hover:text-white hover:bg-[#1a1a2e] border border-white/5 hover:border-cyan-500/30'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* List of Bento Parallel Cards with Mid-Page Banner */}
            <div className="space-y-6">
              {filteredParallels.map((parallel, idx) => {
                const isMiddle = idx === Math.floor(filteredParallels.length / 2) - 1 || (filteredParallels.length === 1 && idx === 0);
                return (
                  <React.Fragment key={parallel.id}>
                    <ParallelCard
                      parallel={parallel}
                      onExploreWithAI={handleExploreWithAI}
                    />
                    {isMiddle && (
                      <AdMobBanner 
                        adUnitId="ca-app-pub-2559338430231736/6882475219" 
                        section="midpage" 
                        sectionLabel="Biblioteca" 
                        positionLabel="Mitad de Pantalla" 
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* AdMob Banner (Biblioteca) - Al final del listado principal sin interrumpir lectura */}
            <AdMobBanner section="library" sectionLabel="Biblioteca" />

          </div>
        )}

        {/* TAB 2: Live AI Analyzer */}
        {activeTab === 'ai-analyzer' && (
          <AILiveAnalyzer
            initialTopic={selectedTopicForAI}
            onClearInitialTopic={() => setSelectedTopicForAI('')}
          />
        )}

        {/* TAB 3: Comparative Matrix */}
        {activeTab === 'matrix' && (
          <ComparativeMatrix />
        )}

        {/* TAB 4: Verses of Hope */}
        {activeTab === 'verses' && (
          <VerseViewer />
        )}

        {/* TAB 5: Future Projection (Statistical Mode) */}
        {activeTab === 'future-projection' && (
          <FutureProjectionModule
            onAnalyzeCustomHypothesis={handleExploreWithAI}
          />
        )}
        {activeTab === 'scratch' && (
          <ScratchTest />
        )}

      </main>

      {/* Gen Z Neon Footer */}
      <footer className="bg-[#07070c] border-t border-white/10 text-zinc-500 text-xs py-8 mt-12 font-mono relative overflow-hidden">
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-96 h-20 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center sm:text-left relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-zinc-200 text-xs tracking-wider uppercase bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
                PARALELISMO BÍBLICO GLOBAL • ECONOMÍA, SOCIEDAD & FINANZAS
              </span>
            </div>

            <p className="text-zinc-400 text-[11px]">
              Scraper & Data: BBC, Reuters, Financial Times, UN News, FMI, FAO, AP.
            </p>
          </div>

          <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-zinc-500 text-[10px] gap-2">
            <p>
              Análisis comparativo teológico e histórico global © 2026 • Gen Z Edition
            </p>
            <p className="text-cyan-400 font-mono font-bold tracking-wider">
              ⚡ PROVERBIOS // LEVÍTICO // SANTIAGO // APOCALIPSIS // HAGEO
            </p>
          </div>
        </div>
      </footer>

      {/* Quick Search Modal */}
      <QuickSearchModal
        isOpen={isQuickSearchOpen}
        onClose={() => setIsQuickSearchOpen(false)}
        onRunSearch={handleRunQuickSearch}
      />

    </div>
  );
}


