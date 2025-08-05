"use client";

import dynamic from "next/dynamic";

const DynamicGA = dynamic(
  () => import("@next/third-parties/google").then((mod) => mod.GoogleAnalytics),
  {
    ssr: false,
  }
);

export default DynamicGA;
