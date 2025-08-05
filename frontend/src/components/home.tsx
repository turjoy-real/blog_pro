import dynamic from "next/dynamic";
import { Suspense } from "react";

const DynamicTag = dynamic(() => import("@/components/tagLine"), {
  ssr: false,
});

const DynamicSubTag = dynamic(() => import("@/components/subTag"), {
  ssr: false,
});

const DynamicParticles = dynamic(() => import("@/components/particles"), {
  ssr: false,
});

const DynamicNavBar = dynamic(() => import("@/components/Navbar"), {
  ssr: false,
});

export default function Home() {
  // #comments
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <DynamicNavBar />
      <Suspense>
        <div className="w-screen md:h-px sm:h-1 animate-glow animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      </Suspense>

      <DynamicParticles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <Suspense>
        <DynamicTag />
      </Suspense>

      <Suspense>
        <div className="w-screen md:h-px sm:h-1 animate-glow animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      </Suspense>

      <DynamicSubTag />
    </div>
  );
}
