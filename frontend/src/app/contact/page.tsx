import { Github, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../../components/nav";
import { Card } from "../../components/card";
import { Metadata } from "next";

const socials = [
  {
    icon: <Twitter size={20} />,
    href: "https://twitter.com/turjoy_",
    label: "Twitter",
    handle: "@turjoy_",
  },
  {
    icon: <Mail size={20} />,
    href: "mailto:dev@turjoysaha.com",
    label: "Email",
    handle: "dev@turjoysaha.com",
  },
  {
    icon: <Github size={20} />,
    href: "https://github.com/turjoy-real",
    label: "Github",
    handle: "turjoy-real",
  },
];

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
      default: "Contact",
      template: `%s | Turjoy's`,
    },
    description: "Turjoy's Contact",

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

export default function Example() {
  return (
    <div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />
      <div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
        <div className="grid w-full grid-cols-1 gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-3 lg:gap-16">
          {socials.map((s, i) => (
            <Card key={i}>
              <Link
                href={s.href}
                target="_blank"
                className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24  lg:pb-48  md:p-16"
              >
                <span
                  className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
                  aria-hidden="true"
                />
                <span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
                  {s.icon}
                </span>{" "}
                <div className="z-10 flex flex-col items-center">
                  <span className="text-xl font-medium duration-150 lg:text-3xl text-zinc-200 group-hover:text-white font-sans">
                    {s.handle}
                  </span>
                  <span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
                    {s.label}
                  </span>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
