import { fetchAPI } from "@/utils/fetch-api";
import Post from "@/views/post";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const fetchData = async () => {
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/categories`;
      const urlParamsObject = {
        sort: { createdAt: "desc" },
        populate: "articles",
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);

      return responseData.data;
    } catch (error) {
      console.error("error: ", error);
      return [];
    }
  };

  let d = await fetchData();

  let list = [];

  for (let category of d) {
    for (let article of category.attributes.articles.data) {
      list.push({
        category: category.attributes.slug,
        slug: article.attributes.slug,
      });
    }
  }

  return list;
}

async function getPostBySlug(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/articles`;

  const urlParamsObject = {
    filters: { slug },
    // populate: {
    //   //   cover: { fields: ["url"] },
    //   // authorsBio: { populate: "*" },
    //   //   category: { fields: ["name"] },
    //   //   blocks: { populate: "*" },
    // },
    populate: "deep",
  };

  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  // console.log("dark: ", response);

  return response;
}

async function getMetaData(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/articles`;
  const urlParamsObject = {
    filters: { slug },
    populate: { seo: { populate: "*" } },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response.data;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const meta = await getMetaData(params.slug);
  const metadata = meta[0].attributes.seo;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
  };
}

export default async function PostRoute({
  params,
}: {
  params: { slug: string; category: string };
}) {
  const { slug, category } = params;
  const data = await getPostBySlug(slug);
  // console.log("data23: ", );

  if (data.data.length === 0) return <h2>no post found</h2>;

  return (
    <Post
      data={data.data[0]}
      goBack="/blog"
      url={process.env.NEXT_FIREBASE_RDB_URL || ""}
    />
  );
}
