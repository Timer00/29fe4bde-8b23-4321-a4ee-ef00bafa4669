import { keywords } from "@/config/generator";
import { type Params, generatePaths } from "@/utils/generator";
import type { NextPage } from "next";
import Template from "@/components/Template";
import { getTemplate } from "@/config/template";

interface LandingProps {
  params: Params;
  template: Template
}

// L A N D I N G
const Landing: NextPage<LandingProps> = ({ params, template }) => {
  return (
    <div>
      <Template template={template} />
      <pre>{(JSON.stringify({ params, template }, null, 4))}</pre>
    </div>
  );
}

export const getStaticProps = async (
  context: { params: Params }
) => {
  for (const key in context.params) {
    if (!keywords[key as keyof typeof keywords][context.params[key as keyof Params]]) {
      return { notFound: true };
    }
  }
  
  const template = await getTemplate(context.params);
  
  return {
    props: {
      params: context.params,
      template,
    }
  };
}
export const getStaticPaths = async () => {
  return {
    paths: generatePaths(keywords),
    fallback: 'blocking'
  };
}

export default Landing;