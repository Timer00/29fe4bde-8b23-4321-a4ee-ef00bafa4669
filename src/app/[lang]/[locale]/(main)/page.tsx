import pageData from '@/app/[lang]/[locale]/(main)/content.json';
import SectionRenderer, { type Block } from "@/sections/SectionRenderer";
import { type TargetLanguageCode } from "deepl-node";
import { deepTranslate } from "@/utils/translation";

type Section = Block

export interface Params {
  lang: string;
  locale: string;
}

//TODO: Perhaps generate the paths first and then work on the middleware.

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

export default async function Home({ params }: { params: Params }) {
  const { lang } = params;
  const translatedContent = await deepTranslate(pageData, 'en', lang as TargetLanguageCode) as Section[];
  console.log(translatedContent);

  return (
    <>
      {translatedContent?.map((section, i) => SectionRenderer(section, i))}
    </>
  )
}
