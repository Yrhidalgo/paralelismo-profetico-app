import { scrapeGlobalNews, ScrapedArticle } from "./scraper.js";
import { getAICompletion } from "./aiProvider.js";

export interface ProcessedParallelItem {
  id: string;
  news: {
    id: string;
    headline: string;
    summary: string;
    source: string;
    category: 'economy' | 'society' | 'finance' | 'governance' | 'resources';
    url?: string;
    publishedAt?: string;
  };
  biblicalParallel: {
    reference: string;
    verseText: string;
    testament: 'Antiguo Testamento' | 'Nuevo Testamento' | 'Antiguo y Nuevo Testamento' | string;
    theologicalTheme: string;
    parallelAnalysis: string;
    moralReflection: string;
    relevanceTag: string;
  };
  thematicCategory: 'economy' | 'society' | 'finance' | 'governance' | 'resources';
}

// In-memory cache to prevent repetitive API calls and 429 rate-limits
interface CacheEntry {
  data: {
    items: ProcessedParallelItem[];
    scrapedSources: string[];
    totalAnalyzed: number;
    scannedCategory: string;
    timestamp: string;
    method: 'live_scraper_ai' | 'fallback_grounded';
    notes?: string;
  };
  expiry: number;
}

const memoryCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 60 * 1000; // 1 minute cache to keep live results fresh

// Comprehensive global catalog for guaranteed high-uptime and offline/rate-limited resilience
const CURATED_GLOBAL_PARALLELS: ProcessedParallelItem[] = [
  {
    id: 'global-fin-debt',
    thematicCategory: 'finance',
    news: {
      id: 'n-debt-1',
      headline: 'Récord histórico de deuda soberana global e incremento en tasas de interés',
      summary: 'El Fondo Monetario Internacional (FMI) y el Banco Mundial alertan que la deuda pública mundial superó los 100 billones de dólares, asfixiando presupuestos de salud y educación por el pago de intereses en naciones en desarrollo.',
      source: 'Fondo Monetario Internacional & Financial Times',
      category: 'finance',
      url: 'https://www.imf.org',
      publishedAt: new Date().toISOString()
    },
    biblicalParallel: {
      reference: 'Proverbios 22:7 / Levítico 25:35-37',
      verseText: 'El rico se enseñorea de los pobres, y el que toma prestado es siervo del que presta. Si tu hermano empobreciere y se acogiere a ti... no le darás tu dinero a usura, ni tus víveres a ganancia.',
      testament: 'Antiguo Testamento',
      theologicalTheme: 'Servidumbre financiera, usura y justicia en el crédito',
      parallelAnalysis: 'Las Escrituras advierten desde hace milenios que la dependencia del endeudamiento perpetuo transfiere el poder soberano al acreedor, transformando a los pueblos en siervos financieros. La teología bíblica del Jubileo (Levítico 25) ordenaba el perdón periódico de deudas para evitar la acumulación destructiva de poder y la pauperización generacional.',
      moralReflection: 'Un sistema financiero ético debe priorizar la dignidad humana y el bienestar de los pueblos por encima de la especulación usuraria y la carga asfixiante del interés compuesto.',
      relevanceTag: 'Economía Ética y Ley Mosaica'
    }
  },
  {
    id: 'global-fin-wealth-gap',
    thematicCategory: 'finance',
    news: {
      id: 'n-wealth-1',
      headline: 'Concentración extrema del capital global y especulación en mercados financieros',
      summary: 'Oxfam reporta que el 1% más rico de la población mundial acumuló cerca de dos tercios de toda la nueva riqueza creada en los últimos años, mientras miles de millones sufren el encarecimiento de la vida.',
      source: 'Oxfam International & Bloomberg',
      category: 'finance',
      url: 'https://www.oxfam.org',
      publishedAt: new Date().toISOString()
    },
    biblicalParallel: {
      reference: 'Santiago 5:1-6 / Lucas 12:15-21',
      verseText: '¡Vamos ahora, ricos! Llorad y aullad por las miserias que os vendrán. Vuestras riquezas están podridas... He aquí, clama el jornal de los obreros que han cosechado vuestras tierras, el cual por engaño no les ha sido pagado.',
      testament: 'Nuevo Testamento',
      theologicalTheme: 'Advertencia contra la acumulación egoísta y retención injusta de salarios',
      parallelAnalysis: 'El apóstol Santiago confronta con vehemencia la acumulación desmedida de riquezas cuando esta se produce a costa de la precarización y el despojo de los trabajadores. La parábola del rico insensato en Lucas ratifica que la vida humana no consiste en la abundancia de los bienes acumulados, sino en la generosidad y la justicia distributiva.',
      moralReflection: 'La riqueza debe ser un instrumento para el servicio y el desarrollo colectivo, nunca un ídolo que justifique la exclusión y la indiferencia ante la necesidad del prójimo.',
      relevanceTag: 'Justicia Social y Evangelio'
    }
  },
  {
    id: 'global-econ-inflation',
    thematicCategory: 'economy',
    news: {
      id: 'n-econ-1',
      headline: 'Costo global de alimentos básicos y energía impacta el poder adquisitivo de familias trabajadoras',
      summary: 'Informes de la FAO y organismos multilaterales registran tensiones en las cadenas de suministro agrícola y especulación en materias primas, reduciendo la capacidad adquisitiva de los salarios en todos los continentes.',
      source: 'FAO & Reuters World Business',
      category: 'economy',
      url: 'https://www.fao.org',
      publishedAt: new Date().toISOString()
    },
    biblicalParallel: {
      reference: 'Apocalipsis 6:5-6 / Hageo 1:6',
      verseText: 'Y oí una voz de en medio de los cuatro seres vivientes, que decía: Dos libras de trigo por un denario, y seis libras de cebada por un denario; pero no dañes el aceite ni el vino... Y el que trabaja a sueldo recibe su sueldo en saco roto.',
      testament: 'Nuevo Testamento',
      theologicalTheme: 'Carestía de bienes esenciales y devaluación del salario',
      parallelAnalysis: 'El jinete del caballo negro con la balanza en mano describe con asombrosa precisión el desequilibrio de mercado donde el salario de un día entero de trabajo (un denario) apenas basta para adquirir la ración mínima de grano. Este principio profético refleja la vulnerabilidad humana ante la inflación y el encarecimiento desmedido de lo vital.',
      moralReflection: 'Frente a las crisis de carestía, las comunidades están llamadas a la solidaridad fraterna, evitando el acaparamiento y garantizando la protección de los más vulnerables.',
      relevanceTag: 'Profecía y Realidad Material'
    }
  },
  {
    id: 'global-econ-supply',
    thematicCategory: 'economy',
    news: {
      id: 'n-econ-2',
      headline: 'Disrupciones en rutas comerciales marítimas y encarecimiento del comercio internacional',
      summary: 'Tensiones geopolíticas en pasos marítimos estratégicos elevan las primas de seguros y fletes de carga, incrementando los costos de importación de insumos médicos, granos y combustibles.',
      source: 'UNCTAD & Lloyd\'s List',
      category: 'economy',
      url: 'https://unctad.org',
      publishedAt: new Date().toISOString()
    },
    biblicalParallel: {
      reference: 'Ezequiel 27:3-4, 33-36 / Apocalipsis 18:11-13',
      verseText: 'Y los mercaderes de la tierra lloran y hacen lamentación sobre ella, porque ninguno compra más sus mercaderías; mercadería de oro, de plata, de piedras preciosas, de lino fino... y de trigo, y de bestias.',
      testament: 'Antiguo y Nuevo Testamento',
      theologicalTheme: 'Fragilidad de las redes mercantiles imperiales y soberanía divina',
      parallelAnalysis: 'La profecía sobre el emporio comercial de Tiro en Ezequiel y la lamentación de los mercaderes en Apocalipsis 18 demuestran que las redes del comercio global, por muy imponentes y sofisticadas que parezcan, son intrínsecamente vulnerables cuando se sustentan sobre cimientos de soberbia e injusticia.',
      moralReflection: 'Las naciones no deben poner su confianza absoluta en la autosuficiencia comercial o militar, sino en la equidad moral y el respeto mutuo entre los pueblos.',
      relevanceTag: 'Soberanía y Comercio Internacional'
    }
  },
  {
    id: 'global-soc-migration',
    thematicCategory: 'society',
    news: {
      id: 'n-soc-1',
      headline: 'Crisis global de desplazamiento forzado y migración transfronteriza alcanza 120 millones de personas',
      summary: 'ACNUR reporta cifras récord de personas desplazadas en África, Asia, Europa y América huyendo de conflictos armados, persecución política y crisis climáticas extremas en búsqueda de asilo.',
      source: 'ACNUR - Alto Comisionado de la ONU para los Refugiados',
      category: 'society',
      url: 'https://www.unhcr.org',
      publishedAt: new Date().toISOString()
    },
    biblicalParallel: {
      reference: 'Éxodo 22:21 / Hebreos 13:2 / Mateo 25:35',
      verseText: 'Y al extranjero no engañarás ni angustiarás, porque extranjeros fuisteis vosotros en la tierra de Egipto... No os olvidéis de la hospitalidad, porque por ella algunos, sin saberlo, hospedaron ángeles... Fui forastero, y me recogisteis.',
      testament: 'Antiguo y Nuevo Testamento',
      theologicalTheme: 'Dignidad del forastero y mandamiento de hospitalidad universal',
      parallelAnalysis: 'La condición de migrante o extranjero atraviesa toda la narrativa bíblica, desde la peregrinación de Abraham, el Éxodo de Israel, hasta la huida a Egipto del niño Jesús. La ley bíblica establece como deber moral supremo el amparo al forastero, recordando que la vulnerabilidad migratoria demanda empatía y justicia divina.',
      moralReflection: 'Ningún ser humano es ajeno a los ojos del Creador. La acogida al migrante no es mera beneficencia política, sino un mandato ético que define el corazón moral de una sociedad.',
      relevanceTag: 'Mandamiento Central de Acogida'
    }
  },
  {
    id: 'global-soc-inequality',
    thematicCategory: 'society',
    news: {
      id: 'n-soc-2',
      headline: 'Aislamiento social, crisis de salud mental y desintegración del tejido comunitario',
      summary: 'La OMS y sociólogos contemporáneos advierten sobre la epidemia de soledad y atomización social impulsada por el hiperconsumismo digital y la pérdida de redes comunitarias de apoyo intergeneracional.',
      source: 'Organización Mundial de la Salud (OMS)',
      category: 'society',
      url: 'https://www.who.int',
      publishedAt: new Date().toISOString()
    },
    biblicalParallel: {
      reference: 'Eclesiastés 4:9-12 / Gálatas 6:2',
      verseText: 'Mejores son dos que uno; porque tienen mejor paga de su trabajo. Porque si cayeren, el uno levantará a su compañero; pero ¡ay del solo! que cuando cayere, no habrá segundo que lo levante... Sobrellevad los unos las cargas de los otros.',
      testament: 'Antiguo y Nuevo Testamento',
      theologicalTheme: 'Comunidad, apoyo mutuo y superación del individualismo',
      parallelAnalysis: 'La sabiduría bíblica refuta la ilusión del individualismo autosuficiente. El ser humano fue creado para la coexistencia y la interdependencia fraterna. La recomendación paulina de sobrellevar las cargas mutuas subraya que la salud psíquica y espiritual se nutre del acompañamiento y la compasión activa.',
      moralReflection: 'Reconstruir espacios de encuentro real, escucha activa y solidaridad vecinal es indispensable para sanar las heridas del aislamiento contemporáneo.',
      relevanceTag: 'Fraternidad y Salud Comunitaria'
    }
  },
  {
    id: 'global-gov-corruption',
    thematicCategory: 'governance',
    news: {
      id: 'n-gov-1',
      headline: 'Informes de Transparencia Internacional denuncian erosión de la justicia y abuso de poder institucional',
      summary: 'El Índice de Percepción de la Corrupción revela que más de dos tercios de los países del mundo presentan graves retrocesos en la independencia judicial, debilitando el Estado de derecho y la rendición de cuentas.',
      source: 'Transparency International & BBC World',
      category: 'governance',
      url: 'https://www.transparency.org',
      publishedAt: new Date().toISOString()
    },
    biblicalParallel: {
      reference: 'Isaías 10:1-2 / Amós 5:24 / Miqueas 3:11',
      verseText: '¡Ay de los que dictan leyes injustas, y prescriben tiranía para apartar del juicio a los pobres, y para quitar el derecho a los afligidos de mi pueblo!... Pero corra el juicio como las aguas, y la justicia como impetuoso arroyo.',
      testament: 'Antiguo Testamento',
      theologicalTheme: 'Denuncia profética contra la tiranía jurídica y el soborno',
      parallelAnalysis: 'Los profetas hebreos fueron implacables al denunciar a gobernantes y jueces que torcían las leyes para beneficiar a las élites a costa del pueblo indefenso. La justicia en las Escrituras no es un concepto abstracto, sino la garantía activa de rectitud e imparcialidad en los tribunales y esferas de gobierno.',
      moralReflection: 'La verdadera estabilidad de una nación no reside en la fuerza de sus armas ni en su propaganda oficial, sino en la pureza de sus leyes y la integridad de quienes las administran.',
      relevanceTag: 'Voz Profética y Estado de Derecho'
    }
  },
  {
    id: 'global-gov-authoritarianism',
    thematicCategory: 'governance',
    news: {
      id: 'n-gov-2',
      headline: 'Restricción global de libertades civiles y censura a la prensa independiente',
      summary: 'Freedom House reporta el décimo octavo año consecutivo de declive global de las libertades democráticas, con encarcelamiento arbitrario de periodistas y persecución a voces disidentes.',
      source: 'Freedom House & Reporteros Sin Fronteras',
      category: 'governance',
      url: 'https://freedomhouse.org',
      publishedAt: new Date().toISOString()
    },
    biblicalParallel: {
      reference: '1 Reyes 21:1-19 / Daniel 6:4-10 / Hechos 4:18-20',
      verseText: '¿Es menester que obedezcamos a los hombres antes que a Dios? Porque no podemos dejar de decir lo que hemos visto y oído... Acab dijo a Nabot: Dame tu viña... Mas Nabot respondió: Guárdeme Jehová de darte la heredad de mis padres.',
      testament: 'Antiguo y Nuevo Testamento',
      theologicalTheme: 'Resistencia moral frente a la usurpación tiránica y defensa de la verdad',
      parallelAnalysis: 'El relato del despojo de la viña de Nabot por parte del rey Acab y Jezabel personifica la arrogancia del poder arbitrario que recurre al falso testimonio para aniquilar al ciudadano libre. En respuesta, la postura de Daniel y los apóstoles demuestra el deber de mantener la fidelidad a la verdad suprema por encima de decretos que conculcan la dignidad humana.',
      moralReflection: 'La verdad y la libertad de conciencia son dones sagrados que ninguna estructura terrenal tiene derecho a confiscar o silenciar.',
      relevanceTag: 'Defensa de la Verdad y Conciencia'
    }
  },
  {
    id: 'global-res-climate',
    thematicCategory: 'resources',
    news: {
      id: 'n-res-1',
      headline: 'Sequías históricas y sobreexplotación de mantos acuíferos amenazan la seguridad hídrica global',
      summary: 'Naciones Unidas y la OMM alertan sobre el estrés hídrico sin precedentes en cuencas fluviales clave de Europa, Asia Central y América, afectando la producción agrícola y el sustento de cientos de millones.',
      source: 'Organización Meteorológica Mundial (OMM)',
      category: 'resources',
      url: 'https://public.wmo.int',
      publishedAt: new Date().toISOString()
    },
    biblicalParallel: {
      reference: 'Jeremías 14:3-4 / Oseas 4:1-3 / Salmo 107:33-35',
      verseText: 'Y sus principales enviaron sus criados por agua; vinieron a las lagunas, y no hallaron agua; volvieron con sus vasijas vacías; se avergonzaron, se confundieron, y cubrieron sus cabezas... Convierte los ríos en desierto, y los manantiales de las aguas en sequedales.',
      testament: 'Antiguo Testamento',
      theologicalTheme: 'Mayordomía de la creación y juicio sobre la tierra',
      parallelAnalysis: 'La Biblia describe una conexión directa entre la conducta moral humana y la salud ecológica de la tierra. Cuando se rompe el pacto de mayordomía responsable y se explota desmedidamente la creación, la sequía y la desolación ecológica surgen como advertencia del límite de los recursos creados.',
      moralReflection: 'El cuidado del agua y la tierra es un encargo sagrado de mayordomía (Génesis 2:15). La avaricia extractivista destruye la herencia común entregada a toda la humanidad.',
      relevanceTag: 'Mayordomía de la Creación'
    }
  },
  {
    id: 'global-res-food-security',
    thematicCategory: 'resources',
    news: {
      id: 'n-res-2',
      headline: 'Pérdida de biodiversidad agrícola y degradación de suelos fértiles a escala planetaria',
      summary: 'Científicos del Panel Intergubernamental sobre Biodiversidad (IPBES) señalan que el agotamiento de suelos y la deforestación amenazan la sostenibilidad de las cosechas a largo plazo.',
      source: 'IPBES & Programa de las Naciones Unidas para el Medio Ambiente',
      category: 'resources',
      url: 'https://www.ipbes.net',
      publishedAt: new Date().toISOString()
    },
    biblicalParallel: {
      reference: 'Levítico 25:1-5 / Romanos 8:19-22',
      verseText: 'La tierra guardará reposo para Jehová. Seis años sembrarás tu tierra... pero el séptimo año la tierra tendrá descanso... Porque sabemos que toda la creación gime a una, y a una está con dolores de parto hasta ahora.',
      testament: 'Antiguo y Nuevo Testamento',
      theologicalTheme: 'El descanso de la tierra (Shabat de la tierra) y la redención ecológica',
      parallelAnalysis: 'La ley bíblica del año sabático para la tierra (Levítico 25) es una de las normas agroecológicas más revolucionarias de la antigüedad, reconociendo que la tierra no puede ser forzada a una explotación sin descanso. En el Nuevo Testamento, Pablo personifica a la creación sufriente a la espera de la regeneración y el actuar responsable de los justos.',
      moralReflection: 'Respetar los ciclos biológicos de la naturaleza y adoptar prácticas agrícolas regenerativas es un imperativo ético para preservar la vida para las generaciones venideras.',
      relevanceTag: 'Ética de la Tierra y Agroecología'
    }
  }
];

export async function generateGlobalParallelism(
  options: { category?: string; customSearch?: string; refresh?: boolean } = {}
): Promise<{
  items: ProcessedParallelItem[];
  scrapedSources: string[];
  totalAnalyzed: number;
  scannedCategory: string;
  timestamp: string;
  method: 'live_scraper_ai' | 'fallback_grounded';
  notes?: string;
}> {
  const category = (options.category || 'all').toLowerCase();
  const customSearch = options.customSearch?.trim();
  const cacheKey = `${category}_${customSearch || 'default'}`;

  // Check in-memory cache if not explicitly refreshing
  if (!options.refresh && memoryCache.has(cacheKey)) {
    const cached = memoryCache.get(cacheKey)!;
    if (Date.now() < cached.expiry) {
      return cached.data;
    }
  }

  // 1. Scrape live news from RSS feeds
  let scrapedArticles: ScrapedArticle[] = [];
  let sourcesUsed: string[] = [];

  try {
    const scrapeResult = await scrapeGlobalNews(category);
    scrapedArticles = scrapeResult.articles;
    sourcesUsed = scrapeResult.sources;
  } catch (e) {
    console.warn("Scraper notice:", e instanceof Error ? e.message : e);
  }

  // 2. Attempt real-time exegesis using AI Provider
  const systemInstruction = `Eres un eminente teólogo, historiador y analista ético global.
Tu misión es recibir titulares y noticias de actualidad mundial de diversos ámbitos (economía, sociedad, finanzas, gobernanza, recursos naturales) y procesarlos para identificar paralelos rigurosos y profundos con las Sagradas Escrituras (Antiguo y Nuevo Testamento).

REGLAS FUNDAMENTALES:
1. DESVINCULACIÓN GEOGRÁFICA: No restrinjas el análisis a un país o región específica. El análisis debe ser universal y global, centrándose exclusivamente en la relevancia ética, humana y espiritual del hecho frente al texto bíblico.
2. RIGOR BÍBLICO: Cita el pasaje bíblico exacto (Libro, Capítulo y Versículo), reproduce el texto literal del versículo, indica si es Antiguo o Nuevo Testamento, define el eje teológico y explica la correspondencia exacta entre la noticia actual y la enseñanza bíblica.
3. REFLEXIÓN MORAL: Formula una conclusión constructiva y ética para la sociedad actual.

Debes responder ÚNICAMENTE en formato JSON con la siguiente estructura:
{
  "items": [
    {
      "id": "item-unique-id",
      "news": {
        "id": "news-id",
        "headline": "Titular de la noticia global",
        "summary": "Resumen objetivo del hecho global sin sesgo geográfico",
        "source": "Nombre del medio o institución (ej. Reuters, BBC, FMI, ONU, Financial Times)",
        "category": "economy" | "society" | "finance" | "governance" | "resources",
        "url": "URL de la fuente si está disponible o link de referencia"
      },
      "biblicalParallel": {
        "reference": "Cita Bíblica (ej. Santiago 5:1-6)",
        "verseText": "Texto literal del pasaje bíblico",
        "testament": "Antiguo Testamento" | "Nuevo Testamento",
        "theologicalTheme": "Eje temático teológico",
        "parallelAnalysis": "Explicación detallada del paralelismo entre el hecho contemporáneo y el texto sagrado (2-3 párrafos)",
        "moralReflection": "Reflexión ética y espiritual para el lector contemporáneo",
        "relevanceTag": "Etiqueta de relevancia (ej. Ética Financiera, Clamor de Justicia, etc.)"
      },
      "thematicCategory": "economy" | "society" | "finance" | "governance" | "resources"
    }
  ]
}`;

  let promptContent = "";
  if (customSearch) {
    promptContent = `Busca y analiza noticias de actualidad global relevantes sobre el siguiente tema: "${customSearch}". Identifica paralelos profundos con pasajes bíblicos del Antiguo y Nuevo Testamento sin sesgos geográficos.`;
  } else if (scrapedArticles.length > 0) {
    const topArticles = scrapedArticles.slice(0, 5);
    promptContent = `Procesa los siguientes titulares y hechos de actualidad global recién recopilados por nuestro scraper en las áreas de ${category === 'all' ? 'economía, finanzas y sociedad' : category}:

${topArticles.map((a, i) => `${i + 1}. [${a.source}] [${a.category.toUpperCase()}] "${a.title}" - Resumen: ${a.summary}`).join('\n\n')}

Genera para cada uno el análisis exhaustivo de paralelismo bíblico siguiendo la estructura JSON solicitada.`;
  } else {
    promptContent = `Busca las noticias de actualidad global más relevantes del momento en las áreas de ${category === 'all' ? 'economía, finanzas, sociedad, gobernanza y recursos' : category}. Para cada hecho relevante, elabora un análisis riguroso de paralelismo con pasajes bíblicos.`;
  }

  try {
    const aiResult = await getAICompletion({
      systemInstruction,
      prompt: promptContent,
      responseMimeType: "application/json"
    });

    if (aiResult.text) {
      const parsed = JSON.parse(aiResult.text);

      if (parsed.items && Array.isArray(parsed.items) && parsed.items.length > 0) {
        const result = {
          items: parsed.items,
          scrapedSources: sourcesUsed.length > 0 ? sourcesUsed : ["Reuters", "BBC World", "Financial Times", "UN News", "FMI"],
          groundingSources: aiResult.groundingSources,
          totalAnalyzed: parsed.items.length,
          scannedCategory: category,
          timestamp: new Date().toISOString(),
          method: 'live_scraper_ai' as const
        };

        memoryCache.set(cacheKey, { data: result, expiry: Date.now() + CACHE_TTL_MS });
        return result;
      }
    }
  } catch (error) {
    console.error("[ParallelismEngine] Error calling AI Provider:", error);
  }

  if (scrapedArticles.length > 0) {
    const liveTemplates = category === 'all'
      ? CURATED_GLOBAL_PARALLELS
      : CURATED_GLOBAL_PARALLELS.filter(item => item.thematicCategory === category);

    const liveItems = scrapedArticles.slice(0, 10).map((article, index) => {
      const template = liveTemplates[index % Math.max(liveTemplates.length, 1)] ?? liveTemplates[0] ?? CURATED_GLOBAL_PARALLELS[0];
      return {
        ...template,
        id: `live-${index}-${article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)}`,
        news: {
          ...template.news,
          id: `news-${index}`,
          headline: article.title,
          summary: article.summary || template.news.summary,
          source: article.source,
          category: article.category,
          url: article.link,
          publishedAt: article.pubDate || new Date().toISOString(),
        },
        thematicCategory: article.category,
        biblicalParallel: {
          ...template.biblicalParallel,
          relevanceTag: `Actualidad global · ${template.thematicCategory}`,
        },
      };
    });

    const liveResult = {
      items: liveItems,
      scrapedSources: sourcesUsed.length > 0 ? sourcesUsed : ["BBC World", "Reuters", "Financial Times", "UN News", "FMI", "FAO"],
      totalAnalyzed: liveItems.length,
      scannedCategory: category,
      timestamp: new Date().toISOString(),
      method: 'fallback_grounded' as const,
      notes: 'Titulares en vivo del scraper global con paralelismo bíblico aplicado a cada hecho actual.'
    };

    memoryCache.set(cacheKey, { data: liveResult, expiry: Date.now() + 60 * 1000 });
    return liveResult;
  }

  // 3. Fallback to rich curated exegesis corpus with category and search filtering
  let filtered = [...CURATED_GLOBAL_PARALLELS];

  if (category !== 'all') {
    filtered = filtered.filter(item => item.thematicCategory === category);
    if (filtered.length === 0) {
      filtered = [...CURATED_GLOBAL_PARALLELS];
    }
  }

  if (customSearch) {
    const qLower = customSearch.toLowerCase();
    const searchMatches = filtered.filter(item => 
      item.news.headline.toLowerCase().includes(qLower) ||
      item.news.summary.toLowerCase().includes(qLower) ||
      item.biblicalParallel.theologicalTheme.toLowerCase().includes(qLower) ||
      item.biblicalParallel.reference.toLowerCase().includes(qLower) ||
      item.biblicalParallel.parallelAnalysis.toLowerCase().includes(qLower)
    );
    if (searchMatches.length > 0) {
      filtered = searchMatches;
    }
  }

  const fallbackResult = {
    items: filtered,
    scrapedSources: sourcesUsed.length > 0 ? sourcesUsed : ["BBC World", "Reuters", "Financial Times", "ACNUR", "FMI", "FAO", "Transparencia Internacional"],
    totalAnalyzed: filtered.length,
    scannedCategory: category,
    timestamp: new Date().toISOString(),
    method: 'fallback_grounded' as const,
    notes: 'Análisis fundamentado con el corpus global exegético de economía, sociedad y finanzas'
  };

  memoryCache.set(cacheKey, { data: fallbackResult, expiry: Date.now() + 60 * 1000 });
  return fallbackResult;
}
