import pageData from '@/contents/investment.json'; // Look into moving it to the same folder as this file as content.json
import SectionRenderer, { type Block } from "@/sections/SectionRenderer";

type Section = Block

export interface Params {
  lang: string;
  locale: string;
}

//TODO: Perhaps generate the paths first and then work on the middleware.
// also render the countries in the header.

const languages = ['en','es','de'];
const locales = ['CA','AD','DE'];

export async function generateStaticParams() {
  return languages.reduce((state: Params[], language) => {
    const countries = locales.map(country => {
      return {lang: language, locale: country}
    })
    return [
      ...state,
      ...countries
    ]
  }, [])
}

export default function Home({params}: {params: Params}) {
  console.log(params);
  return (
    <>
      {pageData?.map((section, i) => SectionRenderer(section as Section, i))}
    </>
  )
}
