import { useEffect, useRef, useState } from "react";
import VirtualMachine from "scratch-vm";
import * as ScratchRender from "scratch-render";
import { ScratchStorage } from "scratch-storage";
import AudioEngine from "scratch-audio";
import * as ScratchSVGRenderer from "scratch-svg-renderer";
import { Play, Square, Info } from "lucide-react";

export default function ScratchTest() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState("Inicializando Scratch...");
  const [isReady, setIsReady] = useState(false);
  const vmRef = useRef<any>(null);

  useEffect(() => {
    let vm: any = null;
    let renderer: any = null;
    let storage: any = null;
    let audioEngine: any = null;
    let isDisposed = false;

    const startScratch = async () => {
      try {
        if (!canvasRef.current) {
          console.error("Canvas ref is null");
          return;
        }

        // Verificar soporte WebGL
        const gl = canvasRef.current.getContext('webgl') || canvasRef.current.getContext('experimental-webgl');
        if (!gl) {
          throw new Error("WebGL no es soportado en este navegador/dispositivo.");
        }

        setStatus("Configurando motor gráfico WebGL...");

        // 1. Inicializar VM
        vm = new VirtualMachine();
        vmRef.current = vm;

        // 2. Configurar Almacenamiento (Storage)
        storage = new ScratchStorage();
        vm.attachStorage(storage);

        // 3. Configurar Motor de Audio
        try {
          audioEngine = new AudioEngine();
          vm.attachAudioEngine(audioEngine);
        } catch (audioError) {
          console.warn("Audio Engine no pudo iniciarse:", audioError);
        }

        // 4. Configurar Renderizador
        // Detectar el constructor correcto para ScratchRender
        const RendererConstructor = (ScratchRender as any).ScratchRender || (ScratchRender as any).default || ScratchRender;
        renderer = new RendererConstructor(canvasRef.current);
        vm.attachRenderer(renderer);

        // Configurar tamaño del escenario estándar de Scratch (480x360)
        if (renderer.setStageSize) {
          renderer.setStageSize(-240, 240, -180, 180);
        }

        // 5. Configurar Adaptadores de Imagen
        // Detectar constructores para SVG y Bitmap
        const SVGConstructor = (ScratchSVGRenderer as any).SVGRenderer || (ScratchSVGRenderer as any).default?.SVGRenderer || ScratchSVGRenderer;
        const BitmapConstructor = (ScratchSVGRenderer as any).BitmapAdapter || (ScratchSVGRenderer as any).default?.BitmapAdapter || (ScratchSVGRenderer as any).BitmapConstructor;

        if (typeof SVGConstructor === 'function') {
          vm.attachV2SVGAdapter(new SVGConstructor());
        }
        if (typeof BitmapConstructor === 'function') {
          vm.attachV2BitmapAdapter(new BitmapConstructor());
        }

        setStatus("Descargando proyecto .sb3...");

        const projectUrl = "/scratch/_comments.sb3";
        console.log("Fetching project from:", projectUrl);

        const response = await fetch(projectUrl);

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status} al cargar ${projectUrl}`);
        }

        const buffer = await response.arrayBuffer();
        console.log("Project buffer received, size:", buffer.byteLength);

        await vm.loadProject(buffer);

        if (isDisposed) return;

        console.log("Scratch VM Lista. Targets:", vm.runtime.targets.length);
        setStatus(`Listo para ejecutar: ${vm.runtime.targets.length} objetos.`);
        setIsReady(true);

        // Iniciar el loop de la VM
        vm.start();

        // Forzar un dibujo inicial
        if (renderer && renderer.draw) {
          renderer.draw();
        }

        // Loop de dibujo sincronizado con el refresco de pantalla
        const renderLoop = () => {
          if (isDisposed) return;
          if (renderer && renderer.draw) {
            renderer.draw();
            requestAnimationFrame(renderLoop);
          }
        };
        renderLoop();

      } catch (error) {
        console.error("Fallo en Scratch Runtime:", error);
        setStatus(`Error Crítico: ${error instanceof Error ? error.message : String(error)}`);
      }
    };

    startScratch();

    return () => {
      isDisposed = true;
      try {
        vm?.stopAll();
        if (renderer && typeof renderer.dispose === 'function') {
          renderer.dispose();
        }
      } catch (e) {
        console.warn("Limpieza incompleta:", e);
      }
    };
  }, []);

  const handleGreenFlag = () => {
    if (vmRef.current) {
      // Importante: Algunos navegadores bloquean audio hasta interacción del usuario
      if (vmRef.current.runtime.audioEngine && vmRef.current.runtime.audioEngine.audioContext) {
        vmRef.current.runtime.audioContext.resume();
      }
      vmRef.current.greenFlag();
      setStatus("Ejecutando scripts (Bandera Verde)...");
    }
  };

  const handleStop = () => {
    if (vmRef.current) {
      vmRef.current.stopAll();
      setStatus("Ejecución detenida.");
    }
  };

  return (
    <div className="w-full min-h-[700px] rounded-3xl border border-cyan-500/20 bg-[#07070c] p-6 text-white shadow-[0_0_50px_rgba(0,0,0,0.5)]">

      {/* Header del Componente */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-black tracking-tighter flex items-center gap-2">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">SCRATCH</span>
            <span className="text-zinc-500">RUNTIME</span>
          </h2>
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${isReady ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-amber-500 animate-pulse'}`} />
            <p className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
              {status}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleGreenFlag}
            disabled={!isReady}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest hover:bg-emerald-500/20 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Play className="w-4 h-4 fill-current" />
            Iniciar
          </button>
          <button
            onClick={handleStop}
            disabled={!isReady}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-widest hover:bg-rose-500/20 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Square className="w-4 h-4 fill-current" />
            Detener
          </button>
        </div>
      </div>

      {/* Stage Area */}
      <div className="flex flex-col items-center gap-6">
        <div className="relative group">
          {/* Neon Frame */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 to-fuchsia-500/30 rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity" />

          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl">
            <canvas
              ref={canvasRef}
              width={480}
              height={360}
              className="block max-w-full touch-none cursor-crosshair"
              style={{ imageRendering: 'auto' }}
            />
          </div>

          {/* Canvas Labels */}
          <div className="absolute -top-3 left-4 px-2 py-0.5 bg-zinc-900 border border-white/10 rounded text-[9px] font-mono text-zinc-500 uppercase tracking-tighter">
            Stage 480x360
          </div>
        </div>

        {/* Info Cards */}
        <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 h-fit">
              <Info className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Motor Integrado</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Ejecutando Scratch VM 5.0 con soporte completo de eventos y física. Compatible con activos externos y extensiones.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex gap-3">
            <div className="p-2 rounded-lg bg-fuchsia-500/10 h-fit">
              <Play className="w-4 h-4 text-fuchsia-400" />
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Audio & Media</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Renderizado WebGL de alta fidelidad. Audio contextual sincronizado con la ejecución de bloques.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
