import pageData from '@/contents/investment.json';
import SectionRenderer, { type Block } from "@/sections/SectionRenderer";

type Section = Block

export default function Home() {
  return (
    <>
      {pageData?.map((section, i) => SectionRenderer(section as Section, i))}
    </>
  )
}
