import FormSubmit from "./FormSubmit";

interface EmailProps {
  id: string;
  __component: string;
  title: string;
  description: string;
  emailPlaceholder: string;
  submitButton: {
    text: string;
  };
}

export default function Email({ data }: { data: EmailProps }) {
  return (
    <section className="py-6 bg-slate-900 text-gray-50">
      <div className="container mx-auto flex flex-col justify-center p-4 space-y-8 md:p-10 lg:space-y-0 lg:space-x-12 lg:justify-between lg:flex-row">
        <div className="flex flex-col space-y-4 text-center lg:text-left">
          <h2 className="text-3xl font-bold leading-none text-white">
            {data.title}
          </h2>
          <p className="text-md">{data.description}</p>
        </div>
        <FormSubmit
          placeholder={data.emailPlaceholder}
          text={data.submitButton.text}
        />
      </div>
    </section>
  );
}
