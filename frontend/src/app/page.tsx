import dynamic from "next/dynamic";

const DynamicHome = dynamic(() => import("@/components/home"), {
  ssr: false,
});

export default function Home() {
  return <DynamicHome />;
}
