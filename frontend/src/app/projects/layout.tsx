import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  //   const meta = await getGloba(params.lang);

  //   if (!meta.data) return FALLBACK_SEO;

  //   const { metadata, favicon } = meta.data.attributes;
  //   const { url } = favicon.data.attributes;

  return {
    title: {
      default: "Projects",
      template: `%s | turjoysaha.com`,
    },
    description: "Turjoy's Projects",

    openGraph: {
      title: "turjoysaha.com",
      description: "Software Engineer",
      url: "https://turjoysaha.com",
      siteName: "turjoysaha.com",
      images: [
        {
          url: "https://turjoysaha.com/opengraph-image.png",
          width: 1920,
          height: 1080,
        },
      ],
      locale: "en-US",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    twitter: {
      title: "Turjoy",
      card: "summary_large_image",
    },
    metadataBase: new URL("https://turjoysaha.com/"),
  };
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900 ">
      {children}
    </div>
  );
}
