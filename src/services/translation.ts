import { cache } from 'react'
import DeepL from "@/services/deepl";
import { type Language, type SourceLanguageCode, type TargetLanguageCode } from "deepl-node";

export const translate = cache(async (text: string, sourceLang: SourceLanguageCode, targetLang: TargetLanguageCode): Promise<string> => {
  return await DeepL.translate(text, sourceLang, targetLang);
})

export const fetchLanguages = cache(async (): Promise<readonly Language[]> => {
  return await DeepL.getLanguages();
})
