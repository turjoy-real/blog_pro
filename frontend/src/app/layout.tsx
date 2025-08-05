// import { getStrapiURL } from "../utils/api-helpers";
// import dynamic from "next/dynamic";
// import { fetchAPI } from "../utils/fetch-api";

// import { i18n } from "../../i18n-config";
// import { FALLBACK_SEO } from "@/utils/constants";

import { Roboto, Nunito_Sans } from "next/font/google";
// import { Metadata } from "next";
// import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
// import "./core.css";
// import DynamicGA from "@/components/analytics/GA";
// import DynamicVA from "@/components/analytics/VA";
// import DynamicVS from "@/components/analytics/VS";
import { GoogleAnalytics } from "@next/third-parties/google";
// import { Analytics } from "@/components/analytics";
import { SpeedInsights } from "@vercel/speed-insights/next";
// import dynamic from "next/dynamic";

// import { GoogleAnalytics } from "@next/third-parties/google";
// import { SpeedInsights } from "@vercel/speed-insights/next";

// const DynamicGA = dynamic(
//   () => import("@next/third-parties/google").then((mod) => mod.GoogleAnalytics),
//   {
//     ssr: false,
//   }
// );
// const DynamicVA = dynamic(
//   () => import("@vercel/analytics/react").then((mod) => mod.Analytics),
//   {
//     ssr: false,
//   }
// );

import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";

// const DynamicVS = dynamic(
//   () => import("@vercel/speed-insights/next").then((mod) => mod.SpeedInsights),
//   {
//     ssr: false,
//   }
// );

const comic = Roboto({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-comic",
});

const calSans = Nunito_Sans({
  weight: "600",
  subsets: ["latin"],
  variable: "--font-calsans",
});

// async function getGlobal(lang: string): Promise<any> {
//   const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

//   if (!token)
//     throw new Error("The Strapi API Token environment variable is not set.");

//   const path = `/global`;
//   const options = { headers: { Authorization: `Bearer ${token}` } };

//   const urlParamsObject = {
//     populate: [
//       "metadata",
//       "favicon",
//       "metaTitle",
//       // "notificationBanner.link",
//       // "navbar.links",
//       // "navbar.navbarLogo.logoImg",
//       // "footer.footerLogo.logoImg",
//       // "footer.menuLinks",
//       // "footer.legalLinks",
//       // "footer.socialLinks",
//       "footer.categories",
//     ],
//     locale: lang,
//   };
//   return await fetchAPI(path, urlParamsObject, options);
// }

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  // const meta = await getGlobal(params.lang);

  // if (!meta.data) return FALLBACK_SEO;
  // console.log(meta.data);

  // const { metadata, favicon } = meta.data.attributes;
  // const { url } = favicon.data.attributes;

  return {
    title: {
      default: "Turjoy's", //"metadata.metaTitle,
      template: `%s | Turjoy's`,
    },
    description:
      "Know about the software and marketing challenges I have faced so far.", //metadata.metaDescription,

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
    // icons: {
    //   icon: [new URL(url, getStrapiURL())],
    // },
    metadataBase: new URL("https://turjoysaha.com/"),
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[calSans.variable, comic.variable].join(" ")}>
      <head>
        <GoogleAnalytics gaId="G-LT097X5J42" />
        {/* <DynamicGA gaId="G-LT097X5J42" /> */}
        <Analytics />
        {/* <DynamicVA /> */}
        <SpeedInsights />
        {/* <DynamicVS /> */}
        <meta
          name="seobility"
          content="14367815f49ea4028ea164c1e52c73a5"
        ></meta>
      </head>
      <body
        className={`bg-black ${
          process.env.NODE_ENV === "development" ? "debug-screens" : undefined
        }`}
      >
        {children}
      </body>
    </html>
  );
}
