import { nextApiRequest } from "@/utils/api";
import { type Country } from "@/interfaces/countries";

export async function getCountries(): Promise<Country[]>{
  return await nextApiRequest('get-countries');
}
