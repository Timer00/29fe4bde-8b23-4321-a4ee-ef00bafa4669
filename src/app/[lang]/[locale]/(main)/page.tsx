import pageData from '@/app/[lang]/[locale]/(main)/content.json';
import SectionRenderer, { type Block } from "@/sections/SectionRenderer";
import { type Language, type LanguageCode, type TargetLanguageCode } from "deepl-node";
import { deepTranslate } from "@/utils/translation";
import { fetchLanguages } from "@/services/translation";
import { fetchCountries } from "@/services/countries";

type Section = Block

export interface Params {
  [key: string]: string;
  // TODO: Ensure correct type TargetLanguageCode or LanguageCode
  lang: LanguageCode;
  locale: string;
}

export async function generateStaticParams() {
  // TODO: DeepL can't handle so many requests, need to optimize translations.
  // const languages = await fetchLanguages();
  // const countries = await fetchCountries();
  // const locales = countries.map(country => country["alpha-2"]);
  const locales = ['de','br','at'];
  const languages = ['pt-BR','de','en-US','en-GB'].map(l => ({ code: l })) as Language[];

  const paths = languages.reduce((state: Params[], language: Language) => {
    const countries = locales.map(country => {
      return { lang: language.code, locale: country }
    })
    return [
      ...state,
      ...countries
    ]
  }, [])

  return paths;
}

export default async function Home({ params }: { params: Params }) {
  const { lang } = params;
  const translatedContent = await deepTranslate(pageData, 'en', lang as TargetLanguageCode) as Section[];

  return (
    <>
      {translatedContent?.map((section, i) => <SectionRenderer block={section} key={i} />)}
    </>
  )
}
