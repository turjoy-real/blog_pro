import dynamic from "next/dynamic";
import { Suspense } from "react";

import RichText from "@/components/RichText";

export function postRenderer(section: any, index: number) {
  switch (section.__component) {
    case "shared.rich-text":
      // const DynamicRichText = dynamic(() => import("@/components/RichText"));
      return <RichText key={index} data={section} />;
    case "shared.slider":
      const DynamicImageSlider = dynamic(
        () => import("@/components/ImageSlider")
      );
      return <DynamicImageSlider key={index} data={section} />;
    case "shared.quote":
      const DynamicQuote = dynamic(() => import("@/components/Quote"));
      return <DynamicQuote key={index} data={section} />;
    case "shared.media":
      const DynamicMedia = dynamic(() => import("@/components/Media"));
      return <DynamicMedia key={index} data={section} />;
    case "shared.video-embed":
      const DynamicVideoEmbed = dynamic(
        () => import("@/components/VideoEmbed"),
        {
          ssr: false,
        }
      );
      return (
        <Suspense>
          <DynamicVideoEmbed key={index} data={section} />
        </Suspense>
      );
    default:
      return null;
  }
}
