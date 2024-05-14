import cldrTerritories from "@/data/cldr-territoryInfo.json";
import type { Language } from "deepl-node";

interface LanguagePopulationData {
  _populationPercent: string;
  _officialStatus?: string;
}

interface CountryData {
  languagePopulation: Record<string, LanguagePopulationData>;
}

/* TODO: Change functions to be more connected.
    * for example, a countries official/most spoken language is not always supported by DeepL, in this case should default to
    * second most spoken language.
*/
export function getLanguageCodeForCountry(countryLocale: string): string | null | undefined {
  const territoryInfo = cldrTerritories.supplemental.territoryInfo as unknown as Record<string, CountryData>;
  const countryData = territoryInfo[countryLocale.toUpperCase()];

  if (!countryData?.languagePopulation) {
    return null;
  }

  const languagePopulation = countryData.languagePopulation;
  const officialLanguages = Object.entries(languagePopulation)
    .filter(([_, data]) => data._officialStatus === 'official')
    .map(([code]) => code);

  if (officialLanguages.length > 0) {
    return officialLanguages[0];
  }

  const languagesByPopulation = Object.entries(languagePopulation).sort(
    ([_, a], [__, b]) => parseFloat(b._populationPercent) - parseFloat(a._populationPercent)
  );

  if (languagesByPopulation.length > 0 && languagesByPopulation[0]) {
    return languagesByPopulation[0][0];
  }

  return null;
}

export function matchAvailableLang(languageCode: string | null | undefined, availableLanguages: readonly Language[]): string {
  if (!languageCode) {
    return 'en-US';
  }

  const matchedLanguage = availableLanguages.find(
    ({ code }) => {
      return code.toLowerCase().includes(languageCode.toLowerCase())
    }
  );

  if (matchedLanguage) {
    return matchedLanguage.code;
  }

  return 'en-US';
}
