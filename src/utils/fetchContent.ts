const CORS_PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://api.codetabs.com/v1/proxy?quest=',
  'https://cors-anywhere.herokuapp.com/',
];

function extractReadableText(html: string): string {
  // Create a temporary DOM parser
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Remove unwanted elements
  const elementsToRemove = [
    'script',
    'style',
    'iframe',
    'img',
    'video',
    'audio',
    'noscript',
    'header',
    'footer',
    'nav',
    'aside',
    'advertisement',
    'meta',
    'link',
  ];

  elementsToRemove.forEach(tag => {
    doc.querySelectorAll(tag).forEach(el => el.remove());
  });

  // Get main content areas
  const mainContent = doc.querySelector('main, article, [role="main"]');
  if (mainContent) {
    return cleanText(mainContent.textContent || '');
  }

  // Fallback to body content if no main content area found
  const bodyContent = doc.querySelector('body');
  return bodyContent ? cleanText(bodyContent.textContent || '') : '';
}

function cleanText(text: string): string {
  return text
    .replace(/\s+/g, ' ')                    // Replace multiple spaces with single space
    .replace(/\n\s*\n/g, '\n')               // Replace multiple newlines with single newline
    .replace(/[^\S\r\n]+/g, ' ')             // Replace multiple spaces (but not newlines) with single space
    .split('\n')                             // Split into lines
    .map(line => line.trim())                // Trim each line
    .filter(line => line.length > 30)        // Keep only substantial lines
    .join('\n')                              // Join back with newlines
    .trim();                                 // Final trim
}

export async function fetchUrlContent(url: string): Promise<string> {
  let lastError: Error | null = null;

  for (const proxy of CORS_PROXIES) {
    try {
      const response = await fetch(proxy + url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const html = await response.text();
      const readableContent = extractReadableText(html);
      
      if (!readableContent) {
        throw new Error('No readable content found on the page');
      }
      
      return readableContent;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error occurred');
      continue;
    }
  }

  throw lastError || new Error('Unable to fetch content. Please try again later or check if the URL is accessible.');
}