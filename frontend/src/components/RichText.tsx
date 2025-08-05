import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface RichTextProps {
  data: {
    body: string;
    slug: string;
    index: string;
  };
}

export default function RichText({ data }: RichTextProps) {
  // TODO: STYLE THE MARKDOWN

  return (
    <section
      className="rich-text px-4 mx-auto prose-zinc prose-quoteless "
      id={data.slug}
      key={data.slug}
    >
      <Markdown children={data.body} remarkPlugins={[remarkGfm]} />
    </section>
  );
}
