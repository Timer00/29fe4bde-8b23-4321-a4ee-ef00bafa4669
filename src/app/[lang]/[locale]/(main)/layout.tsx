import React from "react";
import headerContent from './header.json'
import footerContent from './footer.json'
import { Header, type HeaderData } from "@/sections/Header";
import { Footer, type FooterData } from "@/sections/Footer";
import { fetchCountries } from "@/services/countries";
import { fetchLanguages } from "@/services/translation";
import { deepTranslate } from "@/utils/translation";
import { type Params } from "@/app/[lang]/[locale]/(main)/page";
import type { TargetLanguageCode } from "deepl-node";

export default async function Layout({ children, params = { lang: 'en-US', locale: 'US' } }: { children: React.ReactNode, params: Params }) {
  const countries = await fetchCountries();
  const languages = await fetchLanguages();

  const { lang } = params;
  const translatedHeaderContent = await deepTranslate(headerContent, 'en', lang as TargetLanguageCode);
  const translatedFooterContent = await deepTranslate(footerContent, 'en', lang as TargetLanguageCode);

  return (
    <>
      <Header languages={languages} countries={countries} data={translatedHeaderContent as HeaderData} />
      <main className="flex-auto">{children}</main>
      <Footer data={translatedFooterContent as FooterData} />
    </>
  )
}
