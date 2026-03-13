import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: [
    "ar",
    "cs",
    "da",
    "de",
    "el",
    "en",
    "es",
    "fi",
    "fr",
    "hr",
    "hu",
    "id",
    "it",
    "ja",
    "lv",
    "nl",
    "no",
    "pl",
    "pt",
    "pt-BR",
    "ro",
    "ru",
    "sk",
    "sl",
    "sq",
    "sr",
    "sr-Cyrl",
    "sv",
    "ta",
    "tr",
    "uk",
    "zh",
    "zh-HK"
  ],

  // Used when no locale matches
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

// Next.js 16: renamed from `middleware` to `proxy`
export function proxy(request: import('next/server').NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/((?!api|_next|_vercel|robots.txt|workbox-\\w+\\.js|sw.js|.*\\..*).*)']
};
