import React, { useState } from 'react';
import { getApiUrl } from '../config';
import {
  FUTURE_TEMPORAL_CYCLES, 
  FutureCycleModel, 
  calculateFutureCoordinates 
} from '../data/futureCycles';
import { 
  Sparkles, 
  Clock, 
  BookOpen, 
  Newspaper, 
  ArrowRight, 
  Sliders, 
  Search, 
  Loader2, 
  Check, 
  Copy, 
  Zap,
  RotateCcw,
  Activity,
  Flame
} from 'lucide-react';
import { AdMobBanner } from './AdMobBanner';

interface FutureProjectionModuleProps {
  onAnalyzeCustomHypothesis: (hypothesisText: string) => void;
}

export const FutureProjectionModule: React.FC<FutureProjectionModuleProps> = ({
  onAnalyzeCustomHypothesis
}) => {
  const [selectedCycleId, setSelectedCycleId] = useState<string>(FUTURE_TEMPORAL_CYCLES[0].id);
  
  // Calculator state for custom user temporal coordinates
  const [startYear, setStartYear] = useState<number>(2017);
  const [cycleYears, setCycleYears] = useState<number>(7);
  const [frequencyIntensity, setFrequencyIntensity] = useState<number>(8);
  const [userAlgorithmPrompt, setUserAlgorithmPrompt] = useState<string>(
    'Según la moda estadística del ciclo de 7 años de escasez (Génesis 41), el cálculo de coordenadas temporales ubica el punto de inflexión para Venezuela entre 2025 y 2028.'
  );

  const [analyzingCustom, setAnalyzingCustom] = useState<boolean>(false);
  const [customAIResult, setCustomAIResult] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const currentCycle = FUTURE_TEMPORAL_CYCLES.find(c => c.id === selectedCycleId) || FUTURE_TEMPORAL_CYCLES[0];
  const calculatedCoords = calculateFutureCoordinates(startYear, cycleYears);

  const handleEvaluateCustomAlgorithm = async () => {
    if (!userAlgorithmPrompt.trim()) return;
    setAnalyzingCustom(true);
    setCustomAIResult(null);

    try {
      const response = await fetch(getApiUrl('/api/compare'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `Evaluación de Algoritmo de Moda Temporal e Hipótesis Futura: "${userAlgorithmPrompt}". Coordenada inicial: ${startYear}, Ciclo: ${cycleYears} años. Analiza las coordenadas temporales, moda estadística e intersección con profecías bíblicas para el futuro de Venezuela.`
        })
      });

      if (!response.ok) {
        throw new Error('Error al conectar con la IA');
      }

      const data = await response.json();
      setCustomAIResult(data.analysis);
    } catch {
      setCustomAIResult('No se pudo procesar la consulta con IA en este momento. Intente nuevamente.');
    } finally {
      setAnalyzingCustom(false);
    }
  };

  const handleCopyReport = () => {
    const textToCopy = `PROYECCIÓN DE MODA TEMPORAL Y FUTURO BÍBLICO (VENEZUELA)\n\nModelo: ${currentCycle.title}\nPatrón Bíblico: ${currentCycle.biblicalPatternName}\nCoordenada Futura Proyectada: ${currentCycle.hypotheticalFutureCoordinates.timeframe}\n\nAnálisis de la Moda Estadística:\n${currentCycle.hypotheticalFutureCoordinates.modeProjection}\n\nLapsos y Hitos:\n${currentCycle.hypotheticalFutureCoordinates.keyMilestones.map(m => `• ${m}`).join('\n')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      
      {/* Header Frosted Glass Gray Card */}
      <div className="relative rounded-2xl sm:rounded-3xl p-[1px] bg-gradient-to-r from-rose-500/40 via-fuchsia-500/40 to-cyan-500/40 shadow-2xl">
        <div className="bg-[#12121c]/85 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-wider bg-rose-500/10 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-rose-400" />
                  <span>ESTADÍSTICA TEMPORAL & PARALELISMO PROFÉTICO</span>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-display text-white">
                La Moda del Tiempo: <span className="bg-gradient-to-r from-rose-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">Coordenadas del Pasado vs Futuro</span>
              </h2>
              
              <div className="bg-[#181829]/75 backdrop-blur-md border border-white/10 rounded-xl p-4 text-xs sm:text-sm text-zinc-300 mt-3 max-w-3xl leading-relaxed font-light">
                En la teoría estadística de distribuciones, la <strong>Moda</strong> representa el valor de mayor frecuencia. Aplicado al tiempo histórico e instruido por Eclesiastés 1:9 (<em>"Lo que fue, eso será"</em>), los patrones bíblicos no son eventos aislados, sino picos de frecuencia modal que se repiten cíclicamente. Si el pasado posee coordenadas históricas comprobables, el futuro puede proyectarse mapeando los ciclos proféticos.
              </div>
            </div>

            <div className="shrink-0 flex flex-col gap-2">
              <button
                onClick={handleCopyReport}
                className="px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider bg-[#1a1a2b]/90 hover:bg-[#24243b] text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{copied ? 'REPORTE COPIADO' : 'EXPORTAR REPORTE'}</span>
              </button>
              <span className="text-[10px] font-mono text-zinc-400 text-center uppercase tracking-widest">
                ECLESIASTÉS 1:9 // CÓDIGO TEMPORAL
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Select Cycle Cards with Frosted Glass Styling */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>MODELOS DE MODA TEMPORAL BÍBLICA:</span>
          </h3>
          <span className="text-[10px] font-mono text-zinc-400 uppercase bg-zinc-800/50 px-2 py-0.5 rounded-lg border border-white/5">
            4 Modelos Disponibles
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {FUTURE_TEMPORAL_CYCLES.map((cycle) => {
            const isSelected = cycle.id === selectedCycleId;
            return (
              <button
                key={cycle.id}
                onClick={() => setSelectedCycleId(cycle.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between space-y-3 backdrop-blur-xl relative overflow-hidden active:scale-95 ${
                  isSelected
                    ? 'bg-[#18182c]/90 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.25)] text-white'
                    : 'bg-[#12121c]/75 border-white/10 hover:border-cyan-500/30 text-zinc-400 hover:text-white'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-fuchsia-500" />
                )}
                <div>
                  <span className={`text-[10px] font-mono font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-cyan-400 text-black shadow-sm' : 'bg-[#1a1a2b] text-zinc-400 border border-white/5'
                  }`}>
                    {cycle.biblicalPatternName.split(' ')[0]}
                  </span>
                  <h4 className="text-sm font-bold font-display text-white mt-2 leading-snug">
                    {cycle.title}
                  </h4>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-zinc-400">Proyección:</span>
                  <span className="text-cyan-300 font-bold">{cycle.hypotheticalFutureCoordinates.timeframe}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Analysis of Selected Future Cycle */}
      <div className="bg-[#12121c]/80 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        
        {/* Title & Concept */}
        <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-cyan-400" />
              <span>PATRÓN SELECCIONADO: {currentCycle.biblicalPatternName}</span>
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black font-display text-white mt-1">
              {currentCycle.title}
            </h3>
          </div>
          
          <div className="bg-[#181829]/90 backdrop-blur-md border border-cyan-500/30 px-4 py-2 rounded-xl text-xs font-mono text-zinc-200 shadow-sm">
            <span className="text-zinc-400 uppercase block text-[9px]">Límite Temporal Estimado:</span>
            <span className="text-cyan-300 font-bold text-sm">{currentCycle.hypotheticalFutureCoordinates.timeframe}</span>
          </div>
        </div>

        {/* Premise Concept Frosted Glass Gray Box */}
        <div className="bg-[#181829]/70 backdrop-blur-md border border-white/10 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-300">
              Fundamento de la Moda Estadística
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-light">
            {currentCycle.statisticalModeConcept}
          </p>
        </div>

        {/* 3 Temporal Coordinates Grid (Past, Present, Projected Future) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Coordenada A: Pasado Bíblico */}
          <div className="bg-[#161626]/80 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-5 flex flex-col justify-between space-y-3 shadow-md">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-300">
                  COORDENADA A: BÍBLICA
                </span>
                <span className="text-[10px] font-mono text-zinc-400">{currentCycle.biblicalCoordinates.period}</span>
              </div>

              <div className="font-bold font-display text-white text-base mb-2">
                {currentCycle.biblicalCoordinates.reference}
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed bg-[#12121e]/90 p-3 rounded-xl border border-white/5 font-light">
                "{currentCycle.biblicalCoordinates.eventSummary}"
              </p>
            </div>
            <div className="pt-2 border-t border-white/5 text-[10px] font-mono text-cyan-400 flex items-center gap-1.5">
              <BookOpen className="w-3 h-3" />
              <span>Coordenada de Origen Histórico</span>
            </div>
          </div>

          {/* Coordenada B: Presente Venezolano */}
          <div className="bg-[#161626]/80 backdrop-blur-md border border-rose-500/20 rounded-2xl p-5 flex flex-col justify-between space-y-3 shadow-md">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-rose-400">
                  COORDENADA B: ACTUALIDAD
                </span>
                <span className="text-[10px] font-mono text-zinc-400">{currentCycle.venezuelaCurrentCoordinates.period}</span>
              </div>

              <div className="font-bold font-display text-white text-sm mb-2">
                Fase de Contracción / Crisis Acumulada
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed bg-[#12121e]/90 p-3 rounded-xl border border-white/5 font-light">
                {currentCycle.venezuelaCurrentCoordinates.statusSummary}
              </p>
            </div>
            <div className="pt-2 border-t border-white/5 text-[10px] font-mono text-rose-400 flex items-center gap-1.5">
              <Newspaper className="w-3 h-3" />
              <span>Coordenada de Observación Actual</span>
            </div>
          </div>

          {/* Coordenada C: Futuro Hipotético (Moda Estadística) */}
          <div className="bg-[#18182c]/85 backdrop-blur-md border border-amber-500/30 rounded-2xl p-5 flex flex-col justify-between space-y-3 shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-300">
                  COORDENADA C: FUTURO PROYECTADO
                </span>
                <span className="text-[10px] font-mono text-amber-300 font-bold">{currentCycle.hypotheticalFutureCoordinates.timeframe}</span>
              </div>

              <div className="font-bold font-display text-white text-base mb-2">
                Moda de Inflexión y Restauración
              </div>

              <p className="text-xs text-zinc-200 leading-relaxed bg-[#12121e]/90 p-3 rounded-xl border border-amber-500/20 font-light">
                {currentCycle.hypotheticalFutureCoordinates.modeProjection}
              </p>
            </div>
            <div className="pt-2 border-t border-amber-500/30 text-[10px] font-mono text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              <span>Proyección Modal de la Curva</span>
            </div>
          </div>

        </div>

        {/* Projected Milestones & Probability Factors in Frosted Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          
          {/* Key Milestones */}
          <div className="bg-[#161626]/70 backdrop-blur-md border border-white/10 rounded-2xl p-5 space-y-3">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-300 flex items-center gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
              <span>Hitos Proyectados en la Moda Estadística:</span>
            </h4>
            <ul className="space-y-2">
              {currentCycle.hypotheticalFutureCoordinates.keyMilestones.map((milestone, idx) => (
                <li key={idx} className="text-xs text-zinc-200 flex items-start gap-2.5 font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
                  <span>{milestone}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Probability Catalysts */}
          <div className="bg-[#161626]/70 backdrop-blur-md border border-white/10 rounded-2xl p-5 space-y-3">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-fuchsia-300 flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-fuchsia-400" />
              <span>Factores de Probabilidad & Variables de Ajuste:</span>
            </h4>
            <ul className="space-y-2">
              {currentCycle.probabilityFactors.map((factor, idx) => (
                <li key={idx} className="text-xs text-zinc-300 flex items-start gap-2.5 font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 mt-1.5 shrink-0 shadow-[0_0_6px_rgba(217,70,239,0.8)]" />
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* AdMob Banner - Mitad de la Pantalla */}
      <AdMobBanner 
        adUnitId="ca-app-pub-2559338430231736/6882475219" 
        section="midpage" 
        sectionLabel="Proyecciones Futuras" 
        positionLabel="Mitad de Pantalla" 
      />

      {/* Interactive Temporal Calculator & Custom Algorithm Tester */}
      <div className="bg-[#12121c]/80 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="border-b border-white/10 pb-4">
          <span className="text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest block mb-1">
            SIMULADOR ALGORÍTMICO PERSONALIZADO
          </span>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black font-display text-white">
            Calculadora de Coordenadas de Moda Temporal & <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">Prueba de Algoritmos</span>
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1 font-light">
            Ajuste los parámetros del ciclo o ingrese la hipótesis de su algoritmo (ej. algoritmos generados por ChatGPT o modelos estadísticos propios) para contrastarlos con los registros proféticos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          
          {/* Controls Panel */}
          <div className="space-y-4 bg-[#161626]/75 backdrop-blur-md border border-white/10 p-5 rounded-2xl">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200 border-b border-white/5 pb-2">
              Parámetros de Entrada del Ciclo:
            </h4>

            {/* Start Year */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-zinc-400 flex justify-between">
                <span>Año de Inicio (Coordenada B):</span>
                <span className="text-cyan-300 font-bold">{startYear}</span>
              </label>
              <input
                type="range"
                min="2000"
                max="2024"
                value={startYear}
                onChange={(e) => setStartYear(parseInt(e.target.value))}
                className="w-full accent-cyan-400 bg-[#202032] rounded-lg h-2 cursor-pointer"
              />
            </div>

            {/* Cycle Years */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-zinc-400 flex justify-between">
                <span>Duración del Ciclo Modal (Años):</span>
                <span className="text-cyan-300 font-bold">{cycleYears} años</span>
              </label>
              <input
                type="range"
                min="3"
                max="50"
                value={cycleYears}
                onChange={(e) => setCycleYears(parseInt(e.target.value))}
                className="w-full accent-cyan-400 bg-[#202032] rounded-lg h-2 cursor-pointer"
              />
            </div>

            {/* Intensity Slider */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-zinc-400 flex justify-between">
                <span>Pico Modal de Frecuencia:</span>
                <span className="text-cyan-300 font-bold">{frequencyIntensity} / 10</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={frequencyIntensity}
                onChange={(e) => setFrequencyIntensity(parseInt(e.target.value))}
                className="w-full accent-cyan-400 bg-[#202032] rounded-lg h-2 cursor-pointer"
              />
            </div>

            <button
              onClick={() => { setStartYear(2017); setCycleYears(7); setFrequencyIntensity(8); }}
              className="text-[10px] font-mono text-zinc-400 hover:text-cyan-300 flex items-center gap-1.5 pt-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Restablecer Parámetros por Defecto</span>
            </button>
          </div>

          {/* Computed Results Box */}
          <div className="space-y-4 bg-[#161626]/75 backdrop-blur-md border border-cyan-500/20 p-5 rounded-2xl flex flex-col justify-between shadow-sm">
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 border-b border-white/5 pb-2">
                Coordenadas Calculadas:
              </h4>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-400">Próxima Inflexión Modal:</span>
                  <span className="text-white font-bold text-sm">{calculatedCoords.nextInflexionYear}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-400">Progreso del Ciclo Actual:</span>
                  <span className="text-cyan-300 font-bold">{calculatedCoords.cycleCompletionPct}%</span>
                </div>

                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-400">Número de Iteración Modal:</span>
                  <span className="text-white font-bold">Ciclo #{calculatedCoords.currentCycleNumber}</span>
                </div>

                <div className="flex justify-between py-1">
                  <span className="text-zinc-400">Ventana de Restauración:</span>
                  <span className="text-emerald-400 font-bold">{calculatedCoords.projectedRestorationWindow}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#12121e] rounded-xl text-[11px] text-zinc-300 leading-relaxed font-light border border-white/5">
              <strong className="text-cyan-300 font-medium">Interpretación:</strong> Bajo un ciclo de {cycleYears} años iniciado en {startYear}, la moda estadística proyecta el cruce de la curva de inflexión en el año {calculatedCoords.nextInflexionYear}.
            </div>
          </div>

          {/* Custom Algorithm / Prompt Input */}
          <div className="space-y-3 bg-[#161626]/75 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200 mb-2">
                Evaluar Hipótesis o Algoritmo (ChatGPT / Propio):
              </h4>
              <textarea
                value={userAlgorithmPrompt}
                onChange={(e) => setUserAlgorithmPrompt(e.target.value)}
                placeholder="Escriba aquí la fórmula, argumento o hipótesis de su algoritmo..."
                rows={4}
                className="w-full bg-[#12121e] border border-white/10 focus:border-cyan-400 text-white placeholder-zinc-500 text-xs rounded-xl p-3 focus:outline-none font-sans leading-relaxed"
              />
            </div>

            <button
              onClick={handleEvaluateCustomAlgorithm}
              disabled={analyzingCustom || !userAlgorithmPrompt.trim()}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 hover:opacity-90 disabled:opacity-50 text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 shrink-0 active:scale-95"
            >
              {analyzingCustom ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>Evaluando Algoritmo...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 text-black" />
                  <span>Evaluar Algoritmo con IA</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Custom AI Evaluation Result */}
        {customAIResult && (
          <div className="bg-[#18182c]/85 backdrop-blur-md border border-cyan-500/40 rounded-2xl p-5 sm:p-6 space-y-3 animate-fade-in shadow-xl">
            <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>RESULTADO DEL ANÁLISIS DE LA IA PARA TU ALGORITMO:</span>
            </div>
            <div className="text-xs sm:text-sm text-zinc-200 leading-relaxed whitespace-pre-line bg-[#12121e]/90 p-5 rounded-xl border border-white/10 font-light">
              {customAIResult}
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => onAnalyzeCustomHypothesis(userAlgorithmPrompt)}
                className="px-4 py-2 text-xs font-mono font-bold bg-[#1e1e32] hover:bg-[#282844] text-cyan-300 border border-cyan-500/40 rounded-xl transition-all active:scale-95 shadow-sm"
              >
                Abrir en Analizador Completo
              </button>
            </div>
          </div>
        )}

      </div>

      {/* AdMob Banner (Proyecciones Futuras) */}
      <AdMobBanner section="projections" sectionLabel="Proyecciones Futuras" />

    </div>
  );
};

