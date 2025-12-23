import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Lista di pattern User-Agent per dispositivi mobile
const MOBILE_UA_PATTERNS = [
  /Android/i,
  /webOS/i,
  /iPhone/i,
  /iPad/i,
  /iPod/i,
  /BlackBerry/i,
  /IEMobile/i,
  /Opera Mini/i,
  /Mobile/i,
  /mobile/i,
  /CriOS/i,
  /FxiOS/i,
  /SamsungBrowser/i,
  /UCBrowser/i,
];

// Pattern per rilevare bot e crawler
const BOT_PATTERNS = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /crawling/i,
  /facebookexternalhit/i,
  /facebot/i,
  /facebook/i,
  /linkedinbot/i,
  /twitterbot/i,
  /slurp/i,
  /bingbot/i,
  /googlebot/i,
  /yandex/i,
  /baiduspider/i,
  /duckduckbot/i,
  /sogou/i,
  /exabot/i,
  /ia_archiver/i,
  /semrush/i,
  /ahrefsbot/i,
  /mj12bot/i,
  /dotbot/i,
  /petalbot/i,
  /bytespider/i,
  /applebot/i,
  /pinterest/i,
  /whatsapp/i,
  /telegram/i,
  /slack/i,
  /discord/i,
  /curl/i,
  /wget/i,
  /python/i,
  /java/i,
  /php/i,
  /ruby/i,
  /perl/i,
  /libwww/i,
  /httpclient/i,
  /okhttp/i,
  /axios/i,
  /node-fetch/i,
  /postman/i,
  /insomnia/i,
  /headless/i,
  /phantom/i,
  /selenium/i,
  /puppeteer/i,
  /playwright/i,
  /webdriver/i,
  /chrome-lighthouse/i,
  /pagespeed/i,
  /gtmetrix/i,
  /pingdom/i,
  /uptimerobot/i,
  /statuscake/i,
];

function isMobileDevice(userAgent: string): boolean {
  return MOBILE_UA_PATTERNS.some((pattern) => pattern.test(userAgent));
}

function isBot(userAgent: string): boolean {
  if (!userAgent || userAgent.length < 20) {
    return true;
  }
  return BOT_PATTERNS.some((pattern) => pattern.test(userAgent));
}

// Pagine protette - i bot vengono reindirizzati alla pagina safe
const PROTECTED_PAGES = ['/six-slim'];
const SAFE_PAGE = '/six-slim-desktop';

// Configurazione redirect per route
const DEVICE_REDIRECTS: Record<string, { mobile: string; desktop: string }> = {
  '/go/six-slim': {
    mobile: '/six-slim',
    desktop: '/six-slim-desktop',
  },
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';

  // Protezione bot per pagine protette
  if (PROTECTED_PAGES.some(page => pathname === page || pathname.startsWith(page + '/'))) {
    if (isBot(userAgent)) {
      const url = request.nextUrl.clone();
      url.pathname = SAFE_PAGE;
      return NextResponse.redirect(url);
    }
  }

  // Controlla se la route richiede redirect per device
  const redirectConfig = DEVICE_REDIRECTS[pathname];

  if (redirectConfig) {
    if (isBot(userAgent)) {
      const url = request.nextUrl.clone();
      url.pathname = redirectConfig.desktop;
      return NextResponse.redirect(url);
    }

    const isMobile = isMobileDevice(userAgent);
    const destination = isMobile ? redirectConfig.mobile : redirectConfig.desktop;

    const url = request.nextUrl.clone();
    url.pathname = destination;

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/go/:path*', '/six-slim'],
};
