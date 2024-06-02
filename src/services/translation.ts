import { cache } from 'react'
import deepL from "@/services/deepL";
import { type Language, type SourceLanguageCode, type TargetLanguageCode } from "deepl-node";
import openAI from "@/services/openai";

export const translate = cache(async (text: string, sourceLang: SourceLanguageCode, targetLang: TargetLanguageCode): Promise<string> => {
  return await deepL.translate(text, sourceLang, targetLang);
})

export const aiTranslate = cache(async (text: string, sourceLang: SourceLanguageCode, targetLang: TargetLanguageCode): Promise<string> => {
  const prompt =
    `Only return the translated text in your response, nothing else.` +
    `Please translate the following text to language of code ${targetLang}: ${text}`;
  const completion = await openAI.createChatCompletion(prompt);
  const choices = completion.choices;

  if (choices.length <= 0 || !choices[0]?.message.content) {
    console.error('Failed to get completion choices.')
    return text;
  }

  return choices[0].message.content;
})

export const fetchLanguages = cache(async (): Promise<readonly Language[]> => {
  return await deepL.getLanguages();
})
