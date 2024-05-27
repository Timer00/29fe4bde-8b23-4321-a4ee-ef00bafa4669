import { cache } from 'react'
import deepL from "@/services/deepL";
import { type Language, type SourceLanguageCode, type TargetLanguageCode } from "deepl-node";

export const translate = cache(async (text: string, sourceLang: SourceLanguageCode, targetLang: TargetLanguageCode): Promise<string> => {
  return await deepL.translate(text, sourceLang, targetLang);
})

export const fetchLanguages = cache(async (): Promise<readonly Language[]> => {
  return await deepL.getLanguages();
})
