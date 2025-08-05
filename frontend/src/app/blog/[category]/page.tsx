// import PageHeader from '@/app/[lang]/components/PageHeader';
import { fetchAPI } from "@/utils/fetch-api";
import BlogList from "@/views/blog-list";
import { Navigation } from "@/components/nav";

export async function generateStaticParams() {
  async function categories() {
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/categories`;
      const urlParamsObject = {
        sort: { createdAt: "desc" },
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);
      return responseData.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  let list = [];

  let data = await categories();

  for (let item of data) {
    list.push({ category: item.attributes.slug });
  }

  return list;
}

async function fetchPostsByCategory(filter: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/categories`;
    const urlParamsObject = {
      sort: { createdAt: "desc" },
      filters: {
        slug: filter,
      },
      populate: {
        articles: {
          populate: "*",
        },
      },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const responseData = await fetchAPI(path, urlParamsObject, options);
    return responseData.data[0].attributes.articles;
  } catch (error) {
    console.error(error);
  }
}

export default async function CategoryRoute({
  params,
}: {
  params: { category: string };
}) {
  const filter = params.category;

  const response = await fetchPostsByCategory(filter);
  const { data } = response;

  //TODO: CREATE A COMPONENT FOR THIS
  if (data.length === 0)
    return (
      <div className="relative pb-16">
        <Navigation />
        <div className="px-6 pt-16 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
          <div className="max-w-2xl mx-auto lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
              No posts in this category
            </h2>
          </div>
          <div className="w-full h-px bg-zinc-800" />
        </div>
      </div>
    );

  // Code repeat
  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-16 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Blogs
          </h2>
          <p className="mt-4 text-zinc-400 text-2xl">#{filter}</p>
        </div>
        <div className="w-full h-px bg-zinc-800" />
        <BlogList data={data} content="blog" />
      </div>
    </div>
  );
}
