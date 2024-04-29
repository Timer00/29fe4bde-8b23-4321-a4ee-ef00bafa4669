import { type Params, getData } from "@/utils/generator";

export interface Template {
  title: string;
}

export const getTemplate = async (params: Params): Promise<Template> => {
  const data = getData(params);

  // Example: Fetching data from an API
  const title = await Promise.resolve(`Location: ${data.location.metadata?.name} - Service: ${data.service.metadata?.name}`);

  return {
    title
  }
}
