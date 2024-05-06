import React from "react";
import headerContent from './header.json'
import footerContent from './footer.json'
import { Header, type HeaderData } from "@/sections/Header";
import { Footer, type FooterData } from "@/sections/Footer";
import { fetchCountries } from "@/services/countries";
import { fetchLanguages } from "@/services/translation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const countries = await fetchCountries();
  const languages = await fetchLanguages();
  console.log('is it server?')

  return (
    <>
      <Header languages={languages} countries={countries} data={headerContent as HeaderData} />
      <main className="flex-auto">{children}</main>
      <Footer data={footerContent as FooterData} />
    </>
  )
}
