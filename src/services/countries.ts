import axios from "axios";
import { type Country } from "@/interfaces/countries";
import { mapCountriesToLocales } from "@/mappers/countries";

export const fetchCountries = async (): Promise<(Country & { localeCode?: string })[]> => {
  try {
    const response = await axios.get('https://retoolapi.dev/TkEl3I/countriesdata');
    const countries = response.data as Country[];
    return mapCountriesToLocales(countries);
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw new Error('Failed to fetch countries');
  }
};
