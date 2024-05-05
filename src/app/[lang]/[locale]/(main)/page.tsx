import pageData from '@/app/[lang]/[locale]/(main)/content.json';
import SectionRenderer, { type Block } from "@/sections/SectionRenderer";
import { type SourceLanguageCode, type TargetLanguageCode } from "deepl-node";

type Section = Block

export interface Params {
  lang: string;
  locale: string;
}

//TODO: Perhaps generate the paths first and then work on the middleware.
// also render the countries in the header.

const languages = ['en', 'es', 'de'];
const locales = ['CA', 'AD', 'DE'];

export async function generateStaticParams() {
  return languages.reduce((state: Params[], language) => {
    const countries = locales.map(country => {
      return { lang: language, locale: country }
    })
    return [
      ...state,
      ...countries
    ]
  }, [])
}

const mockTranslate = async (data, src, dst) => {
  return new Promise((resolve) => {
    resolve(data)
  });
}

const dontTranslate = ['author', 'name', 'contactUrl', 'Monthly', 'Annually', 'href', 'logomarkClassName', 'icon', 'screen', 'logo']

// async function translateSection(section: Section | Section[], sourceLang: SourceLanguageCode, targetLang: TargetLanguageCode): Promise<Section> {
//   if (section instanceof Array) {
//     return Promise.all(
//       section.map(async (item, index) => {
//         const key = index.toString();
//         return shouldTranslate(key) ? translateItem(item, sourceLang, targetLang) : item;
//       })
//     );
//   }
//
//   if (typeof section === 'object') {
//     const keys = Object.keys(section);
//
//     return keys.reduce(async (statePromise, key) => {
//       const data = section[key];
//       const state = await statePromise;
//
//       return {
//         ...state,
//         [key]: shouldTranslate(key) ? await translateItem(data, sourceLang, targetLang) : data,
//       };
//     }, Promise.resolve({}));
//   }
//
//   return section;
// }

async function translateSection(section: Section | Section[], sourceLang: SourceLanguageCode, targetLang: TargetLanguageCode): Promise<Section | Section[]> {
  let result;
  if (section instanceof Array)
    result = [...section]
  else
    result = {...section}

  for (const key in section) {
    const data = result[key];
    if (typeof data === 'object' && !data) {
      translateSection(data);
    } else {
      result[key] = await mockTranslate(data, sourceLang, targetLang);
    }
  }

  return result;
}


function shouldTranslate(key: string): boolean {
  return !dontTranslate.includes(key);
}

async function translateItem(item: any, sourceLang: SourceLanguageCode, targetLang: TargetLanguageCode): Promise<any> {
  if (typeof item === 'string') {
    return mockTranslate(item, sourceLang, targetLang);
  }

  if (typeof item === 'object') {
    return translateSection(item, sourceLang, targetLang);
  }

  return item;
}

export default async function Home({ params }: { params: Params }) {
  const { lang } = params;
  const translatedContent = await translateSection(pageData, 'en', lang);
  console.log(translatedContent);

  return (
    <>
      {pageData?.map((section, i) => SectionRenderer(section as Section, i))}
    </>
  )
}
