import { Container } from '@/components/Container'
import ImageRenderer from "@/components/ImageRenderer";

interface Feature {
  name: string;
  description: string;
  icon: string
}

interface SecondaryFeaturesData {
  title: string;
  description: string;
  features: Feature[]
}

export function SecondaryFeatures({ data }: {data: SecondaryFeaturesData}) {
  const { title, description, features } = data;

  return (
    <section
      id="secondary-features"
      aria-label="Features for building a portfolio"
      className="py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-medium tracking-tight text-gray-900">
            {title}
          </h2>
          <p className="mt-2 text-lg text-gray-600">{description}</p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-20 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3"
        >
          {features.map((feature: Feature, i: number) => (
            <li
              key={feature.name}
              className="rounded-2xl border border-gray-200 p-8"
            >
              <ImageRenderer name={feature.icon} index={i} className="h-8 w-8" />
              <h3 className="mt-6 font-semibold text-gray-900">
                {feature.name}
              </h3>
              <p className="mt-2 text-gray-700">{feature.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
