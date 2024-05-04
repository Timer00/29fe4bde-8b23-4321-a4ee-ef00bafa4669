// Helper function to get the locale code from the country name
import { type Country, LocaleToCountry, type Region, type Regions } from "@/interfaces/countries";

export const getRegionFromLocale = (countries: Country[], locale: string): Region | undefined => {
  const country = countries.find(country => country['alpha-2'] as string === locale.toUpperCase());
  return country ? country.region : undefined;
};

const getLocaleCodeFromName = (countryName: string): string | undefined => {
  const entries = Object.entries(LocaleToCountry);
  const foundEntry = entries.find(([code, name]) => name === countryName);
  return foundEntry ? foundEntry[0] : undefined;
};

// Function to map country data with locale codes
export const mapCountriesToLocales = (countries: Country[]): (Country & { localeCode?: string })[] => {
  return countries.map(({ region, ...country }) => ({
    ...country,
    region: region === "" ? 'Global' : region,
    localeCode: getLocaleCodeFromName(country.name)
  }));
};

export const mapCountriesToRegions = (countries: Country[]): Regions => {
  return countries.reduce((state: Regions, country: Country) => {
    const { region } = country;
    const { name } = country;
    if (Object.keys(state).some(v => v === region)) {
      return {
        ...state,
        [region]: {
          ...state[region],
          [name]: country
        }
      }
    }

    return {
      ...state,
      [region]: {
        [name]: country
      }
    }
  }, {} as Regions)
}

export const getRegionsFromCountries = (countries: Country[]): Region[] => {
  return countries.reduce((state, { region }) => {
    if (state.some(value => value === region))
      return [...state];

    return [
      ...state,
      region
    ]
  }, [] as Region[]);
}
