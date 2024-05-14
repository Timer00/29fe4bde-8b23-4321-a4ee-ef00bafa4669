import * as deepl from 'deepl-node';
import { type Language, type SourceLanguageCode, type TargetLanguageCode, type TextResult } from "deepl-node";
import defaultLanguages from "@/data/default_languages.json";

class DeepLAPI {
  private readonly authKey: string;
  private translator: deepl.Translator;

  constructor(authKey: string | undefined) {
    // Perhaps we shouldn't stop the flow of the app if DeepL fails to initialize, instead provide default lang
    if (!authKey) throw new Error('DeepL Auth Key is undefined!')
    this.authKey = authKey;
    this.translator = new deepl.Translator(this.authKey);
  }

  // TODO: Implement an automatic buffer to optimize number of requests
  async translate(text: string, sourceLang: SourceLanguageCode, targetLang: TargetLanguageCode): Promise<string> {
    try {
      const result: TextResult | TextResult[] = await this.translator.translateText(text, sourceLang, targetLang);
      return result.text;
    } catch (error: unknown) {
      // To prevent the rate limits from DeepL to stop the App let's just return text if we hit them.
      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();
        if (errorMessage.includes("too many requests") || errorMessage.includes("socket hang up")) {
          return text;
        }
        console.error('Translation error: ', error);
      } else {
        console.error('Unknown error: ', error);
      }
      throw error;
    }
  }

  async getLanguages(): Promise<readonly Language[]> {
    try {
      return await this.translator.getTargetLanguages();
    } catch (error) {
      console.error('Failed to fetch languages: ', error);
      return defaultLanguages as readonly Language[]; // Default languages if api fails
    }
  }
}

const DeepL = new DeepLAPI(process.env.DEEPL_KEY);

export default DeepL;
