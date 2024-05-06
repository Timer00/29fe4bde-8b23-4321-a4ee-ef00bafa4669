import { type NextRequest, NextResponse } from "next/server";
import { parse } from "accept-language-parser";

export async function middleware(request: NextRequest) {
  const languageCodes = [
    'bg', 'cs', 'da', 'de',
    'el', 'en-GB', 'en-US', 'es',
    'et', 'fi', 'fr', 'hu',
    'id', 'it', 'ja', 'ko',
    'lt', 'lv', 'nb', 'nl',
    'pl', 'pt-BR', 'pt-PT', 'ro',
    'ru', 'sk', 'sl', 'sv',
    'tr', 'uk', 'zh'
  ];

  const { pathname } = request.nextUrl;
  const cookies = request.cookies;

  // Check if there's a locale-country cookie
  const cachedLocale = cookies.get('locale-country')?.value;

  // Check if URL already has a valid locale
  const pathnameHasLocale = languageCodes.some(
    locale => pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) {
    const segments = pathname.split('/');
    const locale = segments[1];
    const country = segments[2];
    // Ensure country code is valid after the locale segment
    if (country && country.length === 2) {
      // Update cookie if different from current
      if (`${locale}/${country}` !== cachedLocale) {
        const response = NextResponse.next();
        response.cookies.set('locale-country', `${locale}/${country}`, { path: '/', maxAge: 60 * 60 * 24 * 365 });
        return response;
      }
      return NextResponse.next(); // URL is already in the correct format
    }
  }

  // Determine the best locale using accept-language-parser or use cached value
  const localeWithCountry = cachedLocale ?? determineBestLocale(request.headers.get('accept-language'), languageCodes);
  const [locale, country] = localeWithCountry.split('/');

  // Build the new URL with correct formatting
  request.nextUrl.pathname = `/${locale}/${country}${pathname}`;
  const response = NextResponse.redirect(request.nextUrl);
  if (!cachedLocale) { // Set cookie if not previously set
    response.cookies.set('locale-country', `${locale}/${country}`, { path: '/', maxAge: 60 * 60 * 24 * 365 });
  }
  return response;
}

function determineBestLocale(acceptLanguageHeader: string | null, languageCodes: string[]): string {
  if (!acceptLanguageHeader) return 'en-US/US';

  const parsedLanguages = parse(acceptLanguageHeader);
  for (const language of parsedLanguages) {
    const exactMatch = languageCodes.find(l => l === `${language.code}-${language.region}`);
    if (exactMatch) {
      return `${language.code}-${language.region}/${language.region}`;
    }
    const broaderLocale = languageCodes.find(locale => locale.startsWith(language.code));
    if (broaderLocale) {
      const [locale, region] = broaderLocale.split('-');
      return `${locale}-${region}/${region}`;
    }
  }

  return 'en-US/US';
}

export const config = {
  matcher: ['/((?!_next).*)'],
};
