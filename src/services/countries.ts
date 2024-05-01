import { type Country } from "@/interfaces/countries";
import { mapCountriesToLocales } from "@/mappers/countries";

export const fetchCountries = async (): Promise<(Country & { localeCode?: string })[]> => {
  try {
    const response = await fetch('https://retoolapi.dev/TkEl3I/countriesdata');

    if (!response.ok) {
      return Promise.reject(Error("Failed to fetch countries"));
    }

    const countries = await response.json() as Country[];
    return mapCountriesToLocales(countries);
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw new Error('Failed to fetch countries');
  }
};
