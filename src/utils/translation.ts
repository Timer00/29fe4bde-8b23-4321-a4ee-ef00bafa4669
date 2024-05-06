import type { SourceLanguageCode, TargetLanguageCode } from "deepl-node";
import { translate } from "@/services/translation";

// Used for testing translation without consuming DeepL credits
function createMockTranslate() {
  let charCount = 0;

  return async function mockTranslate(data: string, src: SourceLanguageCode, dst: TargetLanguageCode): Promise<string> {
    return new Promise((resolve) => {
      if (!src) throw new Error(`src not defined: ${src as undefined}`);
      if (!dst) throw new Error(`dst not defined: ${dst as undefined}`);
      charCount += data.length;
      resolve(`TRANSLATED:${dst}:${data}`);
    });
  };
}

const mockTranslate = createMockTranslate();

const dontTranslate = ['author', 'name', 'contactUrl', 'Monthly', 'Annually', 'href', 'logomarkClassName', 'icon', 'screen', 'logo']

export async function deepTranslate(object: unknown[] | object, sourceLang: SourceLanguageCode, targetLang: TargetLanguageCode): Promise<unknown[] | object> {
  let result: Record<string, unknown> | unknown[];
  if (object instanceof Array)
    return await Promise.all(
      object.map(async (data) => {
        if (typeof data === 'object' && data) {
          return await deepTranslate(data, sourceLang, targetLang);
        } else if (typeof data === 'string') {
          return await mockTranslate(data, sourceLang, targetLang);
        } else {
          return data;
        }
      })
    )
  else {
    result = { ...object };
    for (const key in result) {
      const data = result[key];
      if (typeof data === 'object' && data) {
        result[key] = await deepTranslate(data, sourceLang, targetLang);
      } else if (typeof data === 'string' && !dontTranslate.includes(key)) {
        result[key] = await mockTranslate(data, sourceLang, targetLang);
      } else {
        result[key] = data;
      }
    }

    return result
  }
}

