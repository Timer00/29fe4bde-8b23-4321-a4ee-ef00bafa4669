'use client';

import React, { type FC } from "react";

import { Hero } from '@/sections/Hero'
import { PrimaryFeatures } from "@/sections/PrimaryFeatures";
import { SecondaryFeatures } from "@/sections/SecondaryFeatures";
import { CallToAction } from "@/sections/CallToAction";
import { Reviews } from "@/sections/Reviews";
import { Pricing } from "@/sections/Pricing";
import { Faqs } from "@/sections/Faqs";

export const sections = {
  'hero': Hero,
  'primary-features': PrimaryFeatures,
  'secondary-features': SecondaryFeatures,
  'call-to-action': CallToAction,
  'reviews': Reviews,
  'pricing': Pricing,
  'faqs': Faqs
}

export type SectionNames = keyof typeof sections;

export interface Block {
  name: SectionNames,
  [key: string]: unknown
}

function isSectionComponent(component: unknown): component is FC<{data: Block}> {
  return typeof component === 'function';
}

export default function SectionRenderer ({ block, key }: { block: Block, key: number}) {
  const component = sections[block.name]

  if (isSectionComponent(component)) {
    return React.createElement(component, {
      data: block,
      key
    })
  }
  return React.createElement(
    () => <div>The section {block.name} has not been created yet.</div>,
    { key }
  )
}
