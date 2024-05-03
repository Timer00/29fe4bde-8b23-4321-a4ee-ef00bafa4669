import type { Country, LocaleToCountry, Region, Regions } from "@/interfaces/countries";
import React, { useState } from "react";
import ImageRenderer from "@/components/common/ImageRenderer";
import StackedLayout from "@/components/common/StackedLayout";
import { mapCountriesToRegions } from "@/mappers/countries";

interface CountryPickerProps {
  countries: Country[]
}

export default function CountryPicker({ countries }: CountryPickerProps) {
  const regions: Regions = mapCountriesToRegions(countries);
  const tabs = Object.keys(regions) as Region[];

  const [selectedTab, setSelectedTab] = useState<Region>(tabs[0] ?? '');

  const selectedCountries = regions[selectedTab];

  return (
    <StackedLayout {...{ selectedTab, setSelectedTab, tabs }}>
      {!countries ?
        'Unable to get list of countries.'
        :
        Object.keys(selectedCountries).map((country, i) => (
          <div key={i} className="w-1/3 flex items-center space-x-2 bg-gray-50 text-gray-600">
            <ImageRenderer className="w-6 h-4 rounded"
                           name={selectedCountries[country as LocaleToCountry]["alpha-2"]} />
            <span>{country}</span>
          </div>
        ))
      }
    </StackedLayout>
  )
}
