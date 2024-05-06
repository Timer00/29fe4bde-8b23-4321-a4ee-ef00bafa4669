import pageData from '@/app/[lang]/[locale]/(main)/content.json';
import SectionRenderer, { type Block } from "@/sections/SectionRenderer";
import { type Language, type LanguageCode, type TargetLanguageCode } from "deepl-node";
import { deepTranslate } from "@/utils/translation";
import { fetchLanguages } from "@/services/translation";
import { fetchCountries } from "@/services/countries";

type Section = Block

export interface Params {
  lang: LanguageCode;
  locale: string;
}

//TODO: Perhaps generate the paths first and then work on the middleware.

export async function generateStaticParams() {
  const languages = await fetchLanguages();
  console.log(languages);
  const countries = await fetchCountries();
  const locales = countries.map(country => country["alpha-2"]);

  const paths = languages.reduce((state: Params[], language: Language) => {
    const countries = locales.map(country => {
      return { lang: language.code, locale: country }
    })
    return [
      ...state,
      ...countries
    ]
  }, [])

  // console.log(paths);

  return paths;
}

export default async function Home({ params }: { params: Params }) {
  console.log(params);
  const { lang } = params;
  const translatedContent = await deepTranslate(pageData, 'en', lang as TargetLanguageCode) as Section[];

  return (
    <>
      {translatedContent?.map((section, i) => SectionRenderer(section, i))}
    </>
  )
}
