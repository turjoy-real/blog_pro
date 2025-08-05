"use client";

import dynamic from "next/dynamic";

const DynamicVS = dynamic(
  () => import("@vercel/speed-insights/next").then((mod) => mod.SpeedInsights),
  {
    ssr: false,
  }
);

export default DynamicVS;
