// Helper function to get the locale code from the country name
import { type Country, LocaleToCountry, type Region } from "@/interfaces/countries";

const getLocaleCodeFromName = (countryName: string): string | undefined => {
  const entries = Object.entries(LocaleToCountry);
  const foundEntry = entries.find(([code, name]) => name === countryName);
  return foundEntry ? foundEntry[0] : undefined;
};

// Function to map country data with locale codes
export const mapCountriesToLocales = (countries: Country[]): (Country & { localeCode?: string })[] => {
  return countries.map(country => ({
    ...country,
    localeCode: getLocaleCodeFromName(country.name)
  }));
};

export const getRegionsFromCountries = (countries: Country[]): Region[] => {
  return countries.reduce((state, { region }) => {
    if (region === '') region = 'Global'
    if (state.some(value => value === region))
      return [...state];

    return [
      ...state,
      region
    ]
  }, [] as Region[]);
}
