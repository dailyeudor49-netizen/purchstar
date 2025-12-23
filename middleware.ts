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

function isMobileDevice(userAgent: string): boolean {
  return MOBILE_UA_PATTERNS.some((pattern) => pattern.test(userAgent));
}

// Configurazione redirect per route
const DEVICE_REDIRECTS: Record<string, { mobile: string; desktop: string }> = {
  '/go/six-slim': {
    mobile: '/six-slim',
    desktop: '/six-slim-desktop',
  },
  // Aggiungi altre route qui se necessario
  // '/go/altra-promo': {
  //   mobile: '/altra-promo',
  //   desktop: '/altra-promo-desktop',
  // },
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Controlla se la route richiede redirect per device
  const redirectConfig = DEVICE_REDIRECTS[pathname];

  if (redirectConfig) {
    const userAgent = request.headers.get('user-agent') || '';
    const isMobile = isMobileDevice(userAgent);

    const destination = isMobile ? redirectConfig.mobile : redirectConfig.desktop;

    // Crea URL di destinazione mantenendo eventuali query params
    const url = request.nextUrl.clone();
    url.pathname = destination;

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Specifica su quali path il middleware deve essere eseguito
export const config = {
  matcher: ['/go/:path*'],
};
