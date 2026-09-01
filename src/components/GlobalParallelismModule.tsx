import React, { useState, useEffect } from 'react';
import { getApiUrl } from '../config';
import {
  ParallelismApiResponse, 
  GlobalParallelItem, 
  GlobalThematicCategory 
} from '../types';
import { 
  Globe, 
  Sparkles, 
  RefreshCw, 
  TrendingUp, 
  Users, 
  Coins, 
  Scale, 
  Leaf, 
  BookOpen, 
  ExternalLink, 
  Copy, 
  Check, 
  AlertCircle, 
  Radio, 
  Layers, 
  BookmarkCheck,
  Search,
  ChevronRight
} from 'lucide-react';
import { AdMobBanner } from './AdMobBanner';
import exodusImg from '../assets/images/exodus_journey_desert_1788113311255.jpg';
import scarcityImg from '../assets/images/ancient_economy_scales_1788113329616.jpg';
import financeTreasuryImg from '../assets/images/finances_gold_treasury_1788113347349.jpg';
import justiceImg from '../assets/images/biblical_justice_scales_1788113364062.jpg';
import solidarityImg from '../assets/images/solidarity_bread_sharing_1788134022438.jpg';
import nehemiahImg from '../assets/images/nehemiah_wall_rebuilding_1788134434835.jpg';

const CATEGORY_TABS: { id: GlobalThematicCategory; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'all', label: 'Todas las Temáticas', icon: Globe },
  { id: 'economy', label: 'Economía & Mercados', icon: TrendingUp },
  { id: 'society', label: 'Sociedad & Migración', icon: Users },
  { id: 'finance', label: 'Finanzas & Deuda', icon: Coins },
  { id: 'governance', label: 'Gobernanza & Justicia', icon: Scale },
  { id: 'resources', label: 'Recursos & Creación', icon: Leaf },
];

interface GlobalParallelismModuleProps {
  onSelectTopicForDetailedAI?: (topic: string) => void;
  onCategoryChange?: (category: GlobalThematicCategory) => void;
  onScanComplete?: () => void;
}

export const GlobalParallelismModule: React.FC<GlobalParallelismModuleProps> = ({
  onSelectTopicForDetailedAI,
  onCategoryChange,
  onScanComplete
}) => {
  const [activeCategory, setActiveCategory] = useState<GlobalThematicCategory>('all');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ParallelismApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<GlobalParallelItem | null>(null);

  const fetchParallelismData = async (cat: GlobalThematicCategory = activeCategory, customSearch?: string, isRefresh: boolean = false) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(getApiUrl('/api/parallelism'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: cat,
          customSearch: customSearch || undefined,
          refresh: isRefresh,
        }),
      });

      if (!res.ok) {
        throw new Error('No se pudo conectar con el servicio de paralelismos globales.');
      }

      const json: ParallelismApiResponse = await res.json();
      setData(json);
      if (isRefresh && onScanComplete) {
        onScanComplete();
      }
      if (json.items.length > 0 && !selectedItem) {
        setSelectedItem(json.items[0]);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error inesperado al buscar paralelismos.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParallelismData('all');
  }, []);

  const handleCategoryChange = (cat: GlobalThematicCategory) => {
    setActiveCategory(cat);
    if (onCategoryChange) {
      onCategoryChange(cat);
    }
    fetchParallelismData(cat, searchQuery);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchParallelismData(activeCategory, searchQuery);
  };

  const handleCopyStudy = (item: GlobalParallelItem) => {
    const text = `PARALELISMO BÍBLICO GLOBAL:
HECHO ACTUAL: ${item.news.headline}
FUENTE: ${item.news.source} (${item.thematicCategory.toUpperCase()})
RESUMEN: ${item.news.summary}

PASAJES BÍBLICOS: ${item.biblicalParallel.reference} (${item.biblicalParallel.testament})
TEXTO: "${item.biblicalParallel.verseText}"
EJE TEOLÓGICO: ${item.biblicalParallel.theologicalTheme}

ANÁLISIS DEL PARALELISMO:
${item.biblicalParallel.parallelAnalysis}

REFLEXIÓN MORAL:
${item.biblicalParallel.moralReflection}`;

    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'economy':
        return 'bg-rose-500/10 text-rose-300 border-rose-500/30';
      case 'finance':
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
      case 'society':
        return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30';
      case 'governance':
        return 'bg-purple-500/10 text-purple-300 border-purple-500/30';
      case 'resources':
        return 'bg-teal-500/10 text-teal-300 border-teal-500/30';
      default:
        return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'economy': return 'Economía';
      case 'finance': return 'Finanzas';
      case 'society': return 'Sociedad';
      case 'governance': return 'Gobernanza & Ley';
      case 'resources': return 'Recursos & Clima';
      default: return 'Global';
    }
  };

  const getBiblicalImageForCategory = (category: string) => {
    switch (category) {
      case 'economy':
        return { src: scarcityImg, caption: 'Balanza bíblica en tiempos de carestía y mercado antiguo' };
      case 'finance':
        return { src: financeTreasuryImg, caption: 'Tesoro del templo y registros monetarios en las Escrituras' };
      case 'society':
        return { src: exodusImg, caption: 'La marcha del Éxodo por el desierto y dispersión de los pueblos' };
      case 'governance':
        return { src: justiceImg, caption: 'Balanza de la justicia divina en el altar frente al abuso del poder' };
      case 'resources':
        return { src: solidarityImg, caption: 'Comunidad compartiendo pan y provisión en tiempos difíciles' };
      default:
        return { src: nehemiahImg, caption: 'Reconstrucción de Jerusalén y restauración comunitaria con fe' };
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      
      {/* Top Banner / Estado del feed */}
      <div className="relative rounded-2xl sm:rounded-3xl p-[1px] bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-fuchsia-500/30 shadow-2xl">
        <div className="bg-[#0b0b14]/95 rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6 backdrop-blur-xl">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              <span className="text-cyan-300 font-mono text-xs uppercase tracking-widest font-extrabold flex items-center gap-1.5 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                <Radio className="w-3.5 h-3.5 text-cyan-400" />
                Live Radar • Actualidad Global & Análisis Profético
              </span>
            </div>

            <h2 className="text-xl sm:text-3xl font-black font-display text-white leading-tight">
              Paralelismo: Titulares de Actualidad Global <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">vs. Sagradas Escrituras</span>
            </h2>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
              Exploración de noticias de economía, sociedad y finanzas mundiales desvinculadas de sesgos geográficos. Cada acontecimiento es examinado puramente por su impacto humano y relevancia frente a la sabiduría profética y ética del Antiguo y Nuevo Testamento.
            </p>

            {data && (
              <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-mono text-zinc-400">
                <span className="bg-[#12121e] px-2.5 py-1 rounded-lg border border-cyan-500/20 text-cyan-300 flex items-center gap-1.5 shadow-sm">
                  <Layers className="w-3 h-3 text-cyan-400" />
                  <span>{data.totalAnalyzed} hechos analizados</span>
                </span>
                <span className="bg-[#12121e] px-2.5 py-1 rounded-lg border border-white/5 text-zinc-300">
                  Fuentes: {data.scrapedSources.slice(0, 3).join(', ')}...
                </span>
                <span className="text-zinc-500">
                  Actualizado: {new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {data.notes && (
                  <span className="bg-fuchsia-500/10 text-fuchsia-300 px-2.5 py-1 rounded-lg border border-fuchsia-500/30 font-medium">
                    ⚡ {data.notes}
                  </span>
                )}
              </div>
            )}

            {/* Hallazgos Web Recientes (Grounding) */}
            {data?.groundingSources && data.groundingSources.length > 0 && (
              <div className="pt-4 space-y-2">
                <h4 className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-3 h-3 animate-pulse" />
                  Hallazgos Rastreados (Últimos 30 días):
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.groundingSources.map((source, i) => (
                    <a
                      key={i}
                      href={source.uri}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 text-[10px] text-zinc-300 transition-all"
                    >
                      <ExternalLink className="w-2.5 h-2.5 text-cyan-400" />
                      <span className="truncate max-w-[150px]">{source.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Primary Action Button 'Paralelismo' */}
          <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2.5">
            <button
              id="btn-trigger-paralelismo"
              onClick={() => fetchParallelismData(activeCategory, searchQuery, true)}
              disabled={loading}
              className="px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 hover:from-cyan-300 hover:to-amber-200 disabled:bg-[#1a1a26] disabled:text-zinc-500 text-black rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] flex items-center justify-center gap-2 group cursor-pointer active:scale-95"
            >
              <RefreshCw className={`w-4 h-4 text-black ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
              <span>{loading ? 'Escaneando Titulares...' : 'Paralelismo (Escanear)'}</span>
            </button>

            <span className="text-[10px] font-mono text-zinc-400 text-center uppercase tracking-widest">
              ⚡ Sin sesgo regional • Universal
            </span>
          </div>
        </div>
      </div>

      {/* Search & Thematic Category Bar */}
      <div className="bg-[#0b0b14]/90 border border-white/10 p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl space-y-3.5 shadow-xl">
        
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar hecho global (ej. Deuda soberana, crisis de refugiados, sequías, hiperinflación)..."
              className="w-full bg-[#12121e] border border-white/10 focus:border-cyan-400 text-white placeholder-zinc-500 text-xs sm:text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all font-sans"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2.5 bg-[#171726] hover:bg-[#222238] text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 font-mono text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 active:scale-95 shadow-sm"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span>Buscar Hecho</span>
            </button>

            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  fetchParallelismData(activeCategory, '');
                }}
                className="px-3 py-2.5 bg-[#12121e] text-zinc-400 hover:text-white border border-white/5 font-mono text-xs rounded-xl transition-colors"
              >
                Limpiar
              </button>
            )}
          </div>
        </form>

        {/* Thematic Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 border-t border-white/5">
          {CATEGORY_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleCategoryChange(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-bold rounded-xl transition-all duration-300 whitespace-nowrap active:scale-95 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-400 to-teal-300 text-black shadow-[0_0_15px_rgba(6,182,212,0.35)] scale-[1.02]'
                    : 'bg-[#12121e] text-zinc-400 hover:text-white hover:bg-[#1a1a2e] border border-white/5 hover:border-cyan-500/30'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-cyan-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-rose-950/30 border border-rose-500/30 text-rose-300 p-4 rounded-2xl flex items-center gap-3 text-xs font-mono">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-4 animate-pulse">
          <div className="bg-[#161618] border border-white/5 rounded-2xl p-6 h-36" />
          <div className="bg-[#161618] border border-white/5 rounded-2xl p-6 h-36" />
          <div className="bg-[#161618] border border-white/5 rounded-2xl p-6 h-36" />
        </div>
      )}

      {/* Results Content */}
      {!loading && data && data.items.length === 0 && (
        <div className="bg-[#161618] border border-white/5 rounded-2xl p-12 text-center space-y-4">
          <Globe className="w-12 h-12 text-zinc-600 mx-auto" />
          <h3 className="text-lg font-serif italic text-white">No se encontraron paralelismos para este filtro</h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            Intente seleccionar otra temática o presione el botón 'Paralelismo (Escanear)' para actualizar las fuentes globales.
          </p>
          <button
            onClick={() => handleCategoryChange('all')}
            className="px-4 py-2 bg-[#c5a059] text-black font-mono text-xs font-bold rounded-xl"
          >
            Ver Todas las Temáticas
          </button>
        </div>
      )}

      {/* List of Global Parallel Bento Cards */}
      {!loading && data && data.items.length > 0 && (
        <div className="space-y-6">
          {data.items.map((item, idx) => {
            const isCopied = copiedId === item.id;
            const isMiddle = idx === Math.floor(data.items.length / 2) - 1 || (data.items.length === 1 && idx === 0);
            return (
              <React.Fragment key={item.id}>
                <div
                  className="bg-[#161618] border border-white/5 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-6 hover:border-white/10 transition-all"
                >
                
                {/* Header: News Meta & Category */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded-lg border ${getCategoryBadgeClass(item.thematicCategory)}`}>
                      {getCategoryLabel(item.thematicCategory)}
                    </span>
                    <span className="text-xs font-mono text-zinc-400 font-medium">
                      Fuente: <strong className="text-zinc-200">{item.news.source}</strong>
                    </span>
                    {item.biblicalParallel.relevanceTag && (
                      <span className="px-2 py-0.5 text-[10px] font-mono text-[#c5a059] bg-[#c5a059]/10 rounded border border-[#c5a059]/20">
                        {item.biblicalParallel.relevanceTag}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyStudy(item)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-[#1c1c1f] hover:bg-[#26262a] text-zinc-300 border border-white/5 rounded-xl transition-colors"
                      title="Copiar estudio"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#c5a059]" />}
                      <span>{isCopied ? 'COPIADO' : 'COPIAR'}</span>
                    </button>

                    {item.news.url && (
                      <a
                        href={item.news.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-[#0c0c0e] hover:bg-[#1c1c1f] text-zinc-400 hover:text-white border border-white/5 rounded-xl transition-colors"
                      >
                        <span>Fuente</span>
                        <ExternalLink className="w-3 h-3 text-[#c5a059]" />
                      </a>
                    )}
                  </div>
                </div>

                {/* 2-Column Comparison Layout: Actualidad Global (Left) vs. Sagradas Escrituras (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  
                  {/* Left Column: Global News Fact */}
                  <div className="bg-[#0e0e18]/90 border border-white/10 hover:border-cyan-500/30 rounded-2xl p-4 sm:p-5 space-y-3 flex flex-col justify-between transition-colors">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 font-bold flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-cyan-400" />
                          Hecho Global Contemporáneo
                        </span>
                        <span className="text-[9.5px] font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded">
                          Sin sesgo
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-display font-bold text-white leading-snug">
                        {item.news.headline}
                      </h3>

                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                        {item.news.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span>Ámbito: <strong className="text-zinc-200">{getCategoryLabel(item.thematicCategory)}</strong></span>
                      <span className="text-cyan-400/80">⚡ Impacto Ético Global</span>
                    </div>
                  </div>

                  {/* Right Column: Biblical Scripture & Revelation */}
                  <div className="bg-[#0e0e18]/90 border border-cyan-500/30 hover:border-cyan-400/50 rounded-2xl p-4 sm:p-5 space-y-3 flex flex-col justify-between transition-colors shadow-lg">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 font-extrabold flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                          Registro & Sabiduría Bíblica
                        </span>
                        <span className="px-2 py-0.5 text-[9px] font-mono uppercase bg-cyan-500/10 text-cyan-300 rounded-lg border border-cyan-500/30">
                          {item.biblicalParallel.testament}
                        </span>
                      </div>

                      {/* Thematic Biblical Event Image */}
                      {(() => {
                        const bibImg = getBiblicalImageForCategory(item.thematicCategory);
                        return (
                          <div className="relative rounded-xl overflow-hidden border border-cyan-500/30 bg-black/60 group/img max-h-[135px] sm:max-h-[160px]">
                            <img
                              src={bibImg.src}
                              alt={bibImg.caption}
                              className="w-full h-24 sm:h-32 object-cover object-center transform group-hover/img:scale-[1.02] transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />
                            <div className="absolute bottom-1 left-2 right-2 flex items-center justify-between text-[9px] font-mono text-zinc-200">
                              <span className="text-cyan-300 truncate max-w-[85%] font-medium">
                                {bibImg.caption}
                              </span>
                              <span className="text-amber-400 text-[8px] uppercase tracking-wider shrink-0">
                                Bíblico
                              </span>
                            </div>
                          </div>
                        );
                      })()}

                      <div>
                        <span className="text-sm sm:text-base font-mono font-bold text-cyan-300 block mb-1">
                          📖 {item.biblicalParallel.reference}
                        </span>
                        <blockquote className="italic text-xs sm:text-sm text-zinc-200 border-l-2 border-cyan-400 pl-3 py-0.5 leading-relaxed bg-[#141424] rounded-r-xl">
                          "{item.biblicalParallel.verseText}"
                        </blockquote>
                      </div>

                      <div className="text-xs text-zinc-400">
                        <strong className="text-cyan-400 font-mono text-[11px] uppercase tracking-wider block mb-0.5">Eje Teológico:</strong>
                        <span className="text-zinc-200">{item.biblicalParallel.theologicalTheme}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/5 text-[11px] font-mono text-cyan-400/80 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>Principio Inmutable • Sagradas Escrituras</span>
                    </div>
                  </div>

                </div>

                {/* Bottom Full-Width Analysis: The Theological Parallelism */}
                <div className="bg-gradient-to-r from-[#0d0d16] to-[#121222] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3 shadow-md">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-widest bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent flex items-center gap-2">
                      <BookmarkCheck className="w-4 h-4 text-amber-400" />
                      <span>Análisis Teológico del Paralelismo</span>
                    </h4>

                    {onSelectTopicForDetailedAI && (
                      <button
                        onClick={() => onSelectTopicForDetailedAI(`${item.news.headline} y su paralelo con ${item.biblicalParallel.reference}`)}
                        className="text-xs font-mono text-[#c5a059] hover:underline flex items-center gap-1"
                      >
                        <span>Profundizar con IA</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed whitespace-pre-line">
                    {item.biblicalParallel.parallelAnalysis}
                  </p>

                  <div className="pt-3 border-t border-white/5 bg-[#161618]/40 -mx-5 -mb-5 p-4 rounded-b-2xl">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                      Reflexión Moral & Conciencia Social:
                    </span>
                    <p className="text-xs text-zinc-300 italic leading-relaxed">
                      "{item.biblicalParallel.moralReflection}"
                    </p>
                  </div>
                </div>

              </div>

              {/* Banner en la Mitad de la Pantalla */}
              {isMiddle && (
                <AdMobBanner 
                  adUnitId="ca-app-pub-2559338430231736/6882475219" 
                  section="midpage" 
                  sectionLabel="Inicio" 
                  positionLabel="Mitad de Pantalla" 
                />
              )}
            </React.Fragment>
          );
        })}
        </div>
      )}

    </div>
  );
};
