import { Nunito_Sans } from "next/font/google";

const calSans = Nunito_Sans({
  weight: "600",
  subsets: ["latin"],
  variable: "--font-calsans",
});

export default async function ConfirmationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  // const global = await getGlobal(params.lang);

  // TODO: CREATE A CUSTOM ERROR PAGE
  // if (!global.data) return null;

  return (
    <html lang="en" className={[calSans.variable].join(" ")}>
      <head></head>
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
