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

  const pathnameHasLocale = languageCodes.some(
    locale => pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) {
    const segments = pathname.split('/');
    // Ensure country code is valid after the locale segment
    if (segments[2] && segments[2].length === 2) {
      return NextResponse.next(); // URL is already in the correct format
    }
  }

  // Determine the best locale using accept-language-parser
  const localeWithCountry = determineBestLocale(request.headers.get('accept-language'), languageCodes);
  const [locale, country] = localeWithCountry.split('/'); // Split into locale and country

  // Build the new URL with correct formatting
  request.nextUrl.pathname = `/${locale}/${country}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

function determineBestLocale(acceptLanguageHeader: string | null, languageCodes: string[]): string {
  if (!acceptLanguageHeader) return 'en-US/US'; // Default if no header is present

  const parsedLanguages = parse(acceptLanguageHeader);
  for (const language of parsedLanguages) {
    // Check if we have a direct match in our locale map
    const exactMatch = languageCodes.find(l => l === `${language.code}-${language.region}`);
    if (exactMatch) {
      return `${language.code}-${language.region}/${language.region}`;
    }
    // Optionally, check broader locale match
    const broaderLocale = languageCodes.find(locale => locale.startsWith(language.code));
    if (broaderLocale) {
      const [locale, region] = broaderLocale.split('-');
      return `${locale}-${region}/${region}`;
    }
  }

  return 'en-US/US'; // Default locale and country if no matches are found
}

export const config = {
  matcher: ['/((?!_next).*)'],
};
