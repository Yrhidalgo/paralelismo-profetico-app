export interface FutureCycleModel {
  id: string;
  title: string;
  biblicalPatternName: string;
  category: 'cycles' | 'jubilee' | 'restoration' | 'prophetic-mode';
  statisticalModeConcept: string;
  biblicalCoordinates: {
    period: string;
    reference: string;
    eventSummary: string;
  };
  venezuelaCurrentCoordinates: {
    period: string;
    statusSummary: string;
  };
  hypotheticalFutureCoordinates: {
    timeframe: string;
    modeProjection: string;
    biblicalAnalogy: string;
    keyMilestones: string[];
  };
  probabilityFactors: string[];
}

export const FUTURE_TEMPORAL_CYCLES: FutureCycleModel[] = [
  {
    id: 'joseph-7-year-cycle',
    title: 'El Ciclo de José: De 7 Años de Vacas Flacas a 7 Años de Abundancia',
    biblicalPatternName: 'Modelo de Inversión Factual (Génesis 41)',
    category: 'cycles',
    statisticalModeConcept: 'Frecuencia heptagonal (ciclos de 7 años). La estadística histórica de las crisis agrarias y financieras muestra un patrón bimodal de contracción profunda seguido de reacondicionamiento productivo extremo cuando se implementa previsión técnica.',
    biblicalCoordinates: {
      period: '1880 a.C. (Egipto Bíblico)',
      reference: 'Génesis 41:28-36',
      eventSummary: 'Egipto atravesó 7 años de abundancia seguidos de 7 años de hambruna devastadora en todo el Medio Oriente. La previsión de almacenamiento administrada por José transformó la escasez en liderazgo económico mundial.'
    },
    venezuelaCurrentCoordinates: {
      period: '2017 - 2024 (Fase de Contracción Severa)',
      statusSummary: 'El ciclo de 7-10 años de contracción hiperinflacionaria, pérdida del 80% del PIB y colapso de la industria petrolera nacional representa la vaguada o "moda de contracción" máxima del dataset venezolano.'
    },
    hypotheticalFutureCoordinates: {
      timeframe: '2025 - 2032 (Moda de Inflexión y Crecimiento)',
      modeProjection: 'La moda estadística predice el agotamiento de la fase contractiva y el inicio de un ciclo de recuperación bivalente impulsado por energía, agricultura tecnificada y capital de repatriación.',
      biblicalAnalogy: 'Tal como el granero de Egipto alimentó a las naciones vecinas, una Venezuela reestructurada pasará de depender de importaciones a ser el granero energético y alimentario del Caribe.',
      keyMilestones: [
        'Apertura tecnológica de la faja petrolera y reactivación del parque agropecuario en los Llanos.',
        'Reingreso masivo de capitales de la diáspora profesional en infraestructura y tecnología.',
        'Eliminación de distorsiones cambiarias y estabilización del poder de compra ciudadano.'
      ]
    },
    probabilityFactors: [
      'Estabilización institucional y seguridad jurídica para inversiones.',
      'Aprovechamiento del dividendo demográfico retornado de la diáspora.',
      'Demanda global persistente de hidrocarburos, gas y minerales limpios.'
    ]
  },
  {
    id: 'jubilee-50-year-restoration',
    title: 'La Moda del Jubileo: Liberación de Deudas, Tierras y Retorno de Exiliados',
    biblicalPatternName: 'Código del Jubileo (Levítico 25)',
    category: 'jubilee',
    statisticalModeConcept: 'Ciclo de Moda Cincuentenario (50 Años). En análisis de series temporales históricas, el intervalo de ~50 años (Ciclos de Kondratiev) marca la reestructuración completa de la propiedad, rescate de hipotecas colapsadas y retorno generacional.',
    biblicalCoordinates: {
      period: 'Año del Jubileo (Ley Mosaica)',
      reference: 'Levítico 25:8-13',
      eventSummary: 'Cada 50 años se tocaba la trompeta (Shofar) en todo el país: las deudas acumuladas quedaban condonadas, los esclavos por deudas recuperaban su libertad y las tierras vendidas o expropiadas volvían a las familias originales.'
    },
    venezuelaCurrentCoordinates: {
      period: '2024 (Acumulación Histórica de Deuda y Despojo)',
      statusSummary: 'Cientos de miles de propiedades expropiadas, familias despojadas de sus activos y un endeudamiento externo asfixiante representan la acumulación previa al corte de frecuencia del Jubileo.'
    },
    hypotheticalFutureCoordinates: {
      timeframe: 'Fase Modal de Restauración (Próximo Quinquenio)',
      modeProjection: 'Activación del "Efecto Jubileo": Un reseteo sistémico de deudas soberanas mediante renegociaciones globales y restitución masiva de propiedades confiscadas a la empresa privada y a los ciudadanos.',
      biblicalAnalogy: 'Cada familia venezolana dispersa por el mundo "volverá a su posesión y a su familia", recuperando títulos de propiedad, hogares y empresas familiares.',
      keyMilestones: [
        'Leyes de restitución de propiedades confiscadas a emprendedores e industriales.',
        'Plan de condonación / reestructuración de la deuda externa soberana venezolana.',
        'Garantías reales para la inversión y retorno de tierras agrícolas a sus legítimos dueños.'
      ]
    },
    probabilityFactors: [
      'Consenso multilateral de acreedores internacionales y la Banca Mundial.',
      'Garantía constitucional inquebrantable a la propiedad privada.',
      'Incentivos fiscales de bienvenida para repatriar activos.'
    ]
  },
  {
    id: 'nehemiah-52-day-reconstruction',
    title: 'El Algoritmo de Nehemías: Reconstrucción Institucional Acelerada',
    biblicalPatternName: 'Efecto Reconstrucción Express (Nehemías 2 - 6)',
    category: 'restoration',
    statisticalModeConcept: 'Moda de Velocidad Exponencial. Una vez alcanzado el punto crítico de consenso social (punto de inflexión de la curva S de adopción), los procesos de reconstrucción de infraestructura no son lineales sino exponenciales.',
    biblicalCoordinates: {
      period: '445 a.C. (Jerusalén Post-Exilio)',
      reference: 'Nehemías 2:17-18, 6:15',
      eventSummary: 'Las murallas de Jerusalén, destruidas por más de 70 años, fueron reconstruidas en un tiempo récord de solo 52 días mediante el trabajo simultáneo y organizado de familias coordinadas por Nehemías.'
    },
    venezuelaCurrentCoordinates: {
      period: 'Deterioro de Infraestructura y Muros Servicios Públicos',
      statusSummary: 'Colapso del sistema eléctrico (SEN), escasez de agua potable y deterioro vial son vistos como "las murallas caídas" que han paralizado la economía cotidiana.'
    },
    hypotheticalFutureCoordinates: {
      timeframe: 'Fase de Levantamiento Acelerado (Meses 1-24 de Transición)',
      modeProjection: 'Reconstrucción en tiempo récord de la red eléctrica, conectividad de telecomunicaciones y potabilización mediante alianzas público-privadas descentralizadas.',
      biblicalAnalogy: 'Cada gremio (médicos, ingenieros, educadores) asume la reparación de su tramo de la "muralla" nacional, logrando en meses lo que parecía requerir décadas.',
      keyMilestones: [
        'Privatización y modernización de plantas térmicas e hidroeléctricas del Guri.',
        'Despliegue masivo de fibra óptica y energía solar distribuida en todo el territorio.',
        'Rehabilitación acelerada de hospitales públicos y escuelas primarias.'
      ]
    },
    probabilityFactors: [
      'Disponibilidad inmediata de financiamiento multilateral para emergencia social.',
      'Voluntariado masivo y contrataciones rápidas con estándares anticorrupción.',
      'Aplicación de tecnologías modulares y renovables de rápido despliegue.'
    ]
  },
  {
    id: 'cyrus-decree-diaspora-return',
    title: 'El Decreto de Ciro: El Fenómeno del Retorno Inverso de la Diáspora',
    biblicalPatternName: 'Modelo de Geopolítica Providencial (Isaías 45 / Esdras 1)',
    category: 'prophetic-mode',
    statisticalModeConcept: 'Moda MIGRATORIA INVERSA. La distribución estadística de las grandes diásporas de la historia (post-IIGM, Irlanda, Corea) demuestra que cuando la renta per cápita y la libertad del país de origen cruzan el umbral de estabilidad, hasta el 40-60% de los exiliados retorna en la primera década.',
    biblicalCoordinates: {
      period: '538 a.C. (Imperio Persa y Judea)',
      reference: 'Esdras 1:1-4 / Isaías 45:1-3',
      eventSummary: 'El rey Ciro de Persia promulgó un decreto imprevisto autorizando a todos los judíos exiliados a regresar a Jerusalén, financiando su viaje y devolviéndoles los utensilios sagrados robados por Nabucodonosor.'
    },
    venezuelaCurrentCoordinates: {
      period: '7.7+ Millones en la Diáspora Global',
      statusSummary: 'Distribuidos en más de 30 países, con altas tasas de escolaridad y experiencia profesional acumulada en empresas globales.'
    },
    hypotheticalFutureCoordinates: {
      timeframe: 'Fase de Gran Flujo de Retorno (Próximos 5 - 10 Años)',
      modeProjection: 'Fenómeno de "Brain Gain" (ganancia de cerebros): Millones de venezolanos formados en el exterior regresan trayendo capital, conocimientos, empresas y redes de contactos internacionales.',
      biblicalAnalogy: 'Los "caminantes" que salieron llorando con sus mochilas regresan con cantos de alegría, transformando las fronteras de Cúcuta y Roraima en entradas de júbilo.',
      keyMilestones: [
        'Vuelos directos masivos de repatriación voluntaria e incentivos tributarios de retorno.',
        'Fundación de startups tecnológicas y centros educativos por venezolanos retornados.',
        'Reagrupación de millones de familias separadas durante más de una década.'
      ]
    },
    probabilityFactors: [
      'Garantía de libertades ciudadanas y cese de persecuciones políticas.',
      'Oferta de empleo calificado y créditos de emprendimiento para retornados.',
      'Leyes de doble nacionalidad y homologación exprés de títulos universitarios.'
    ]
  }
];

export interface StatisticalModalFormula {
  startYear: number;
  cycleDurationYears: number;
  frequencyIntensity: number; // 1-10
  hypothesisText: string;
}

export function calculateFutureCoordinates(startYear: number, cycleYears: number) {
  const currentYear = new Date().getFullYear();
  const cycleCount = Math.floor((currentYear - startYear) / cycleYears);
  const nextInflexionYear = startYear + (cycleCount + 1) * cycleYears;
  const cycleCompletionPct = Math.min(100, Math.round(((currentYear - startYear) % cycleYears) / cycleYears * 100));

  return {
    nextInflexionYear,
    cycleCompletionPct,
    currentCycleNumber: cycleCount + 1,
    projectedRestorationWindow: `${nextInflexionYear} - ${nextInflexionYear + 5}`
  };
}
