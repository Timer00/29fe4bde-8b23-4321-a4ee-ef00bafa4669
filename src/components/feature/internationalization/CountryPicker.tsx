import type { Country, LocaleToCountry, Region } from "@/interfaces/countries";
import React, { useState } from "react";
import ImageRenderer from "@/components/common/ImageRenderer";
import StackedLayout from "@/components/common/StackedLayout";

type Countries = {
  [key in LocaleToCountry]: Country
}

export type Regions = {
  [key in Region]: Countries
}


interface CountryPickerProps {
  countries: Country[]
}

export default function CountryPicker ({countries}: CountryPickerProps) {
  const regions = countries.reduce((state: Regions, country: Country) => {
    let { region } = country;
    const { name } = country;
    if (region === '') region = 'Global';
    if (Object.keys(state).some(v => v === region)) {
      return {
        ...state,
        [region]: {
          ...state[region],
          [name]: country
        }
      }
    }

    return {
      ...state,
      [region]: {
        [name]: country
      }
    }
  }, {} as Regions)
  const tabs = Object.keys(regions);
  console.log(tabs);

  const [selectedTab, setSelectedTab] = useState<Region>(tabs[0] ?? '');

  const selectedCountries = regions[selectedTab];

  return (
    <StackedLayout {...{ selectedTab, setSelectedTab, tabs }}>
      {!countries ?
        'Unable to get list of countries.'
        :
        Object.keys(selectedCountries).map((country, i) => (
          <div key={i} className="w-1/3 flex items-center space-x-2 bg-gray-50 text-gray-600">
            <ImageRenderer className="w-6 h-4 rounded" name={selectedCountries[country]["alpha-2"]} />
            <span>{country}</span>
          </div>
        ))
      }
    </StackedLayout>
  )
}
