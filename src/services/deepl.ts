import * as deepl from 'deepl-node';
import { type Language, type SourceLanguageCode, type TargetLanguageCode, type TextResult } from "deepl-node";

class DeepLAPI {
  private readonly authKey: string;
  private translator: deepl.Translator;

  constructor(authKey: string | undefined) {
    // Perhaps we shouldn't stop the flow of the app if DeepL fails to initialize, instead provide default lang
    if (!authKey) throw new Error('DeepL Auth Key is undefined!')
    this.authKey =  authKey;
    this.translator = new deepl.Translator(this.authKey);
  }

  // TODO: Implement an automatic buffer to optimize number of requests
  async translate(text: string, sourceLang: SourceLanguageCode, targetLang: TargetLanguageCode): Promise<string> {
    try {
      const result: TextResult | TextResult[] = await this.translator.translateText(text, sourceLang, targetLang);
      return result.text;
    } catch (error) {
      console.error('Translation error:', error);
      throw error;
    }
  }

  async getLanguages(): Promise<readonly Language[]> {
    try {
      return await this.translator.getTargetLanguages();
    } catch (error) {
      console.error('Failed to fetch languages');
      throw error;
    }
  }
}

const DeepL = new DeepLAPI(process.env.DEEPL_KEY);

export default DeepL;
