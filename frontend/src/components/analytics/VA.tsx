"use client";

import dynamic from "next/dynamic";

const DynamicVA = dynamic(
  () => import("@vercel/analytics/react").then((mod) => mod.Analytics),
  {
    ssr: false,
  }
);

export default DynamicVA;
