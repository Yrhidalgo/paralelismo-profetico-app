export interface BiblicalPassage {
  reference: string;
  text: string;
  context: string;
  imageUrl?: string;
  imageCaption?: string;
}

export interface VenezuelaNewsContext {
  headline: string;
  summary: string;
  mediaSources: string[];
  keyFacts: string[];
  imageUrl?: string;
  imageCaption?: string;
}

export interface BiblicalParallel {
  id: string;
  title: string;
  category: 'exodus' | 'economy' | 'justice' | 'solidarity' | 'hope';
  theme: string;
  iconName: string;
  biblicalPassage: BiblicalPassage;
  venezuelaNewsContext: VenezuelaNewsContext;
  parallelAnalysis: string;
  reflection: string;
  keyQuotes: {
    biblical: string;
    contemporary: string;
  };
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface AIAnalysisResponse {
  analysis: string;
  biblicalVerses: { reference: string; text: string; application: string }[];
  newsSummary: string;
  groundingSources?: { title: string; uri: string }[];
  timestamp: string;
}

export type GlobalThematicCategory = 'economy' | 'society' | 'finance' | 'governance' | 'resources' | 'all';

export interface GlobalNewsItem {
  id: string;
  headline: string;
  summary: string;
  source: string;
  category: 'economy' | 'society' | 'finance' | 'governance' | 'resources';
  url?: string;
  publishedAt?: string;
}

export interface BiblicalMatch {
  reference: string;
  verseText: string;
  testament: 'Antiguo Testamento' | 'Nuevo Testamento' | 'Antiguo y Nuevo Testamento' | string;
  theologicalTheme: string;
  parallelAnalysis: string;
  moralReflection: string;
  relevanceTag: string;
}

export interface GlobalParallelItem {
  id: string;
  news: GlobalNewsItem;
  biblicalParallel: BiblicalMatch;
  thematicCategory: 'economy' | 'society' | 'finance' | 'governance' | 'resources';
}

export interface ParallelismApiResponse {
  items: GlobalParallelItem[];
  scrapedSources: string[];
  groundingSources?: { title: string; uri: string }[];
  totalAnalyzed: number;
  scannedCategory: string;
  timestamp: string;
  method: 'live_scraper_ai' | 'fallback_grounded';
  notes?: string;
}

