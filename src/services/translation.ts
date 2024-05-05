import { cache } from 'react'
import DeepL from "@/services/deepl";
import { type SourceLanguageCode, type TargetLanguageCode } from "deepl-node";

export const translate = cache(async (text: string, sourceLang: SourceLanguageCode, targetLang: TargetLanguageCode): Promise<string> => {
  return await DeepL.translate(text, sourceLang, targetLang);
})
