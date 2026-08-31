export interface ScrapedArticle {
  title: string;
  summary: string;
  link: string;
  source: string;
  category: 'economy' | 'society' | 'finance' | 'governance' | 'resources';
  pubDate?: string;
}

// Global open RSS feeds categorized by theme (no geographical boundary)
const RSS_FEEDS: { url: string; source: string; category: 'economy' | 'society' | 'finance' | 'governance' | 'resources' }[] = [
  // Economy
  {
    url: 'https://feeds.bbci.co.uk/news/business/rss.xml',
    source: 'BBC Business & Global Economy',
    category: 'economy'
  },
  {
    url: 'https://www.cnbc.com/id/10001147/device/rss/rss.html',
    source: 'CNBC Global Economy',
    category: 'economy'
  },
  // Finance & Markets
  {
    url: 'https://finance.yahoo.com/news/rssindex',
    source: 'Yahoo Finance International',
    category: 'finance'
  },
  {
    url: 'https://feeds.content.dowjones.io/public/rss/mw_topstories',
    source: 'MarketWatch Financial News',
    category: 'finance'
  },
  // Society & Humanitarian
  {
    url: 'https://news.un.org/feed/subscribe/en/news/all/rss.xml',
    source: 'UN News Global Perspective',
    category: 'society'
  },
  {
    url: 'https://feeds.bbci.co.uk/news/world/rss.xml',
    source: 'BBC World Society & Geopolitics',
    category: 'society'
  },
  {
    url: 'https://www.aljazeera.com/xml/rss/all.xml',
    source: 'Al Jazeera Global Reports',
    category: 'governance'
  }
];

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]*>/g, '')
    .trim();
}

/**
 * Parses RSS / Atom XML string into structured articles
 */
function parseRssXml(xml: string, source: string, defaultCategory: 'economy' | 'society' | 'finance' | 'governance' | 'resources'): ScrapedArticle[] {
  const articles: ScrapedArticle[] = [];
  const itemRegex = /<item[\s\S]*?<\/item>/gi;
  const matches = xml.match(itemRegex) || [];

  for (const itemXml of matches.slice(0, 8)) {
    const titleMatch = itemXml.match(/<title>([\s\S]*?)<\/title>/i);
    const linkMatch = itemXml.match(/<link>([\s\S]*?)<\/link>/i) || itemXml.match(/<guid[^>]*>([\s\S]*?)<\/guid>/i);
    const descMatch = itemXml.match(/<description>([\s\S]*?)<\/description>/i) || itemXml.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/i);
    const pubDateMatch = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/i);

    const rawTitle = titleMatch ? titleMatch[1] : '';
    const rawLink = linkMatch ? linkMatch[1] : '';
    const rawDesc = descMatch ? descMatch[1] : '';
    const rawPubDate = pubDateMatch ? pubDateMatch[1] : '';

    const title = decodeHtmlEntities(rawTitle);
    const summary = decodeHtmlEntities(rawDesc).slice(0, 280);
    const link = rawLink.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();

    if (title && title.length > 10) {
      articles.push({
        title,
        summary: summary || title,
        link: link || 'https://news.google.com',
        source,
        category: defaultCategory,
        pubDate: rawPubDate || new Date().toUTCString()
      });
    }
  }

  return articles;
}

/**
 * Scrapes live global headlines across multiple domains
 */
export async function scrapeGlobalNews(categoryFilter?: string): Promise<{ articles: ScrapedArticle[]; sources: string[] }> {
  const selectedFeeds = RSS_FEEDS.filter(feed => {
    if (!categoryFilter || categoryFilter === 'all') return true;
    return feed.category === categoryFilter;
  });

  const scrapedArticles: ScrapedArticle[] = [];
  const activeSources: string[] = [];

  const fetchPromises = selectedFeeds.map(async (feed) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch(feed.url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 ParallelismScraper/1.0',
          'Accept': 'application/rss+xml, application/xml, text/xml, */*'
        }
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const text = await response.text();
        const items = parseRssXml(text, feed.source, feed.category);
        if (items.length > 0) {
          activeSources.push(feed.source);
          return items;
        }
      }
    } catch (err) {
      // Feed fetch timeout or network restriction in sandbox, proceed gracefully
      console.warn(`Could not scrape feed ${feed.url}:`, err instanceof Error ? err.message : err);
    }
    return [];
  });

  const results = await Promise.all(fetchPromises);
  for (const list of results) {
    scrapedArticles.push(...list);
  }

  // Deduplicate by title similarity
  const uniqueArticles: ScrapedArticle[] = [];
  const seenTitles = new Set<string>();

  for (const article of scrapedArticles) {
    const key = article.title.toLowerCase().slice(0, 35);
    if (!seenTitles.has(key)) {
      seenTitles.add(key);
      uniqueArticles.push(article);
    }
  }

  return {
    articles: uniqueArticles,
    sources: activeSources.length > 0 ? activeSources : RSS_FEEDS.map(f => f.source)
  };
}
