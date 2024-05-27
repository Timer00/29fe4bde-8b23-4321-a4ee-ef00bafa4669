import type { SourceLanguageCode, TargetLanguageCode } from "deepl-node";
import { aiTranslate, translate } from "@/services/translation";

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

// TODO: Add these options through a config/content file
const dontTranslate = ['author', 'name', 'contactUrl', 'Monthly', 'Annually', 'href', 'logomarkClassName', 'icon', 'screen', 'logo', 'logoIcon', 'logomarkIcon', 'navLinks', 'borderIcon', 'className'];

export async function deepTranslate(object: unknown[] | object, sourceLang: SourceLanguageCode, targetLang: TargetLanguageCode): Promise<unknown[] | object> {
  if (sourceLang === 'en' && targetLang === 'en-US') return object;

  const translateData = (data: unknown, key?: string | number): unknown => {
    if (typeof data !== "string" || (typeof key === "string" && dontTranslate.includes(key))) return data;

    return translate(data, sourceLang, targetLang)
  }

  return deepMap(object, translateData);
}

export function aiDeepTranslate(object: unknown[] | object, sourceLang: SourceLanguageCode, targetLang: TargetLanguageCode): unknown[] | object {
  if (targetLang.includes(sourceLang)) return object;

  const translateData = (data: unknown, key?: string | number): unknown => {
    if (typeof data !== "string" || (typeof key === "string" && dontTranslate.includes(key))) return data;

    return aiTranslate(data, sourceLang, targetLang)
  }

  return deepMap(object, translateData);
}

export function deepMap(object: unknown[] | object, callback: (arg: unknown, key?: string | number) => unknown): unknown[] | object {
  let result: Record<string, unknown> | unknown[];
  if (object instanceof Array)
    return object.map((data) => {
      if (typeof data === 'object' && data) {
        return deepMap(data, callback);
      } else
        return callback(data)
    })
  else {
    result = { ...object };
    for (const key in result) {
      const data = result[key];
      if (typeof data === 'object' && data) {
        result[key] = deepMap(data, callback);
      } else
        result[key] = callback(data, key);
    }
  }

  return result
}
