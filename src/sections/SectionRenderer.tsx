import { Hero } from './Hero'

import React, { type FC } from "react";
import { PrimaryFeatures } from "@/sections/PrimaryFeatures";
import { SecondaryFeatures } from "@/sections/SecondaryFeatures";
import { CallToAction } from "@/sections/CallToAction";
import { Reviews } from "@/sections/Reviews";
import { Pricing } from "@/sections/Pricing";
import { Faqs } from "@/sections/Faqs";

/*
 * This component is responsible for loading all existing section components and mapping them to the section names
 * coming from the Generator.
 * IMPORTANT: Anytime a new section component is Added in the Generator, AND in the code, it also needs to be added here, following the
 * below pattern.
 */

/* MAP containing the names of the sections coming from the Generator and their relation to the existing section components
 * in the code. This list doesn't affect the order. */
export const sections = {
  'hero': Hero,
  'primary-features': PrimaryFeatures,
  'secondary-features': SecondaryFeatures,
  'call-to-action': CallToAction,
  'reviews': Reviews,
  'pricing': Pricing,
  'faqs': Faqs,
}

export type SectionNames = keyof typeof sections;

export interface Block {
  name: SectionNames,
  [key: string]: unknown
}

// Renders Sections(components) from a string alias.
export default function SectionRenderer (block: Block, key: number) {
  const component = sections[block.name]

  if (typeof component !== 'undefined') {
    //TODO: Fix type issue
    return React.createElement(component as FC<{data: Block}>, {
      data: block,
      key
    })
  }
  return React.createElement(
    () => <div>The section {block.name} has not been created yet.</div>,
    { key }
  )
}
