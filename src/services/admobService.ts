/**
 * Configuración oficial de Google AdMob para "Paralelos Proféticos"
 */
export const ADMOB_CONFIG = {
  // App ID oficial de AdMob
  appId: 'ca-app-pub-2559338430231736~6147143899',

  // ID de Banner para pantalla Inicio (Producción)
  homeBannerId: 'ca-app-pub-2559338430231736/4210868395',

  // ID de Banner para Biblioteca (Producción)
  libraryBannerId: 'ca-app-pub-2559338430231736/5404907869',

  // ID de Banner para Matriz Comparativa (Producción)
  matrixBannerId: 'ca-app-pub-2559338430231736/6989452272',

  // ID de Banner para Proyecciones Futuras (Producción)
  projectionsBannerId: 'ca-app-pub-2559338430231736/4091826196',

  // ID de Banner Intermedio (Mitad de pantalla en todas las páginas)
  midPageBannerId: 'ca-app-pub-2559338430231736/6882475219',

  // ID de Prueba oficial de Google AdMob para Banner Android
  testBannerId: 'ca-app-pub-3940256099942544/6300978111',

  // MODO DE PRUEBAS ACTIVO (Estrictamente requerido durante desarrollo)
  // Cambiar a false para la versión final de las tiendas (Google Play / Samsung)
  isTesting: true,
};

export type AdSection = 'home' | 'library' | 'matrix' | 'projections' | 'midpage' | 'ai-analyzer';

export const SECTION_BANNER_IDS: Record<AdSection, string> = {
  home: ADMOB_CONFIG.homeBannerId,
  library: ADMOB_CONFIG.libraryBannerId,
  matrix: ADMOB_CONFIG.matrixBannerId,
  projections: ADMOB_CONFIG.projectionsBannerId,
  midpage: ADMOB_CONFIG.midPageBannerId,
  'ai-analyzer': ADMOB_CONFIG.midPageBannerId,
};

export const SECTION_NAMES: Record<AdSection, string> = {
  home: 'Pantalla Inicio',
  library: 'Biblioteca',
  matrix: 'Matriz Comparativa',
  projections: 'Proyecciones Futuras',
  midpage: 'Mitad de Pantalla',
  'ai-analyzer': 'Consulta',
};

export function getSectionAdUnitId(section: AdSection, customAdUnitId?: string): string {
  if (customAdUnitId) return customAdUnitId;
  return SECTION_BANNER_IDS[section] || ADMOB_CONFIG.midPageBannerId;
}

/**
 * Detecta de forma segura si la aplicación se ejecuta dentro del runtime nativo de Capacitor (Android/iOS)
 */
export const isCapacitorNative = (): boolean => {
  if (typeof window === 'undefined') return false;
  const cap = (window as unknown as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor;
  return typeof cap?.isNativePlatform === 'function' ? cap.isNativePlatform() : false;
};

let isAdMobInitialized = false;
let isBannerActive = false;

/**
 * Inicializa el SDK de AdMob de forma segura si la app corre en Capacitor Native (Android)
 */
export async function initializeAdMob(): Promise<boolean> {
  if (!isCapacitorNative()) {
    // Entorno Web / Navegador / Preview
    return false;
  }

  if (isAdMobInitialized) {
    return true;
  }

  try {
    const { AdMob } = await import('@capacitor-community/admob');
    await AdMob.initialize({
      testingDevices: ['2077ef9a63d2b398840261c8221a0c9b'],
      initializeForTesting: ADMOB_CONFIG.isTesting,
    });
    isAdMobInitialized = true;
    console.log('[AdMob] SDK inicializado correctamente en modo prueba');
    return true;
  } catch (error) {
    console.warn('[AdMob] Error al inicializar SDK en Android:', error);
    return false;
  }
}

/**
 * Muestra el banner de AdMob para una sección específica
 */
export async function showSectionBanner(section: AdSection = 'home'): Promise<void> {
  if (!isCapacitorNative()) {
    return;
  }

  try {
    const isInit = await initializeAdMob();
    if (!isInit) return;

    const { AdMob, BannerAdSize, BannerAdPosition } = await import('@capacitor-community/admob');
    const adUnitId = ADMOB_CONFIG.isTesting ? ADMOB_CONFIG.testBannerId : getSectionAdUnitId(section);

    await AdMob.showBanner({
      adId: adUnitId,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: ADMOB_CONFIG.isTesting,
    });
    isBannerActive = true;
    console.log(`[AdMob] Banner de sección "${section}" mostrado exitosamente (Modo Prueba: ${ADMOB_CONFIG.isTesting})`);
  } catch (error) {
    console.warn(`[AdMob] No se pudo mostrar el banner nativo de "${section}":`, error);
  }
}

/**
 * Muestra el banner de AdMob en la pantalla de Inicio (compatibilidad hacia atrás)
 */
export async function showHomeBanner(): Promise<void> {
  return showSectionBanner('home');
}

/**
 * Oculta el banner (por ejemplo al cambiar de pestaña o abrir vistas de lectura)
 */
export async function hideBanner(): Promise<void> {
  if (!isCapacitorNative() || !isBannerActive) {
    return;
  }

  try {
    const { AdMob } = await import('@capacitor-community/admob');
    await AdMob.hideBanner();
  } catch (error) {
    console.warn('[AdMob] Error al ocultar banner:', error);
  }
}

export const hideHomeBanner = hideBanner;

/**
 * Remueve el banner por completo
 */
export async function removeBanner(): Promise<void> {
  if (!isCapacitorNative() || !isBannerActive) {
    return;
  }

  try {
    const { AdMob } = await import('@capacitor-community/admob');
    await AdMob.removeBanner();
    isBannerActive = false;
  } catch (error) {
    console.warn('[AdMob] Error al remover banner:', error);
  }
}

export const removeHomeBanner = removeBanner;

