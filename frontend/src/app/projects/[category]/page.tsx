import { permanentRedirect } from "next/navigation";

export default async function CategoryRoute({
  params,
}: {
  params: { category: string };
}) {
  permanentRedirect(`/projects`);
}
