import type { Country, LocaleToCountry, Region, Regions } from "@/interfaces/countries";
import React, { useState } from "react";
import ImageRenderer from "@/components/common/ImageRenderer";
import StackedLayout from "@/components/common/StackedLayout";
import { getRegionFromLocale, mapCountriesToRegions } from "@/mappers/countries";
import { useParams } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

interface CountryPickerProps {
  countries: Country[]
}

export default function CountryPicker({ countries }: CountryPickerProps) {
  const regions: Regions = mapCountriesToRegions(countries);
  const tabs = Object.keys(regions) as Region[];

  const { locale, lang }: { locale: string, lang: string } = useParams<{ lang: string; locale: string }>();

  const [selectedTab, setSelectedTab] = useState<Region>(getRegionFromLocale(countries, locale) ?? tabs[0] ?? '');

  const selectedCountries = regions[selectedTab];

  return (
    <StackedLayout {...{ selectedTab, setSelectedTab, tabs }}>
      {!countries ?
        'Unable to get list of countries.'
        :
        Object.keys(selectedCountries).map((country, i) => {
          const currentCountry = selectedCountries[country as LocaleToCountry];
          const countryLocale = currentCountry["alpha-2"];
          return (
            <Link scroll={false} key={i} href={`/${lang}/${countryLocale}`}
                 className="cursor-pointer hover:bg-gray-50 w-full lg:w-1/4 pl-2 py-1.5 flex items-center space-x-2 text-gray-600">
              <ImageRenderer className="w-6 h-4 rounded"
                             name={countryLocale} />
              <span
                //TODO: Ensure casting is really necessary in this typing:
                className={`${clsx(locale.toUpperCase() === countryLocale as string && 'font-bold text-blue-400')}`}>{country.length > 17 ? countryLocale : country}</span>
            </Link>
          )
        })
      }
    </StackedLayout>
  )
}
