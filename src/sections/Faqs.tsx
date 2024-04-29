import { Container } from '@/components/Container'

type FaqsData = {
  title: string;
  description: string;
  contactText: string;
  contactUrl: string;
  faqs: FaqData[][];
};

type FaqData = {
  question: string;
  answer: string;
};

export function Faqs({ data }: { data: FaqsData }) {
  const { title, description, contactText, contactUrl, faqs } = data;

  return (
    <section
      id="faqs"
      aria-labelledby="faqs-title"
      className="border-t border-gray-200 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faqs-title"
            className="text-3xl font-medium tracking-tight text-gray-900"
          >
            {title}
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            {description}{' '}
            <a href={contactUrl} className="text-gray-900 underline">
              {contactText}
            </a>
            .
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="space-y-10">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-gray-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
