import { Suspense } from "react";
import { fetchAPI } from "../../utils/fetch-api";
import Blog from "../../views/blog-list";
import { Navigation } from "../../components/nav";
import Loader from "./loading";

// dont delete comments

// interface Meta {
//   pagination: {
//     start: number;
//     limit: number;
//     total: number;
//   };
// }

const fetchData = async (start: number, limit: number) => {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/articles`;
    const urlParamsObject = {
      sort: { createdAt: "desc" },
      populate: {
        cover: { fields: ["url"] },
        category: { populate: "*" },
        categories: { populate: "*" },
        authorsBio: {
          populate: "*",
        },
      },
      pagination: {
        start: start,
        limit: limit,
      },
      filters: {
        categories: {
          slug: {
            $ne: "projects",
          },
        },
      },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const responseData = await fetchAPI(path, urlParamsObject, options);
    // console.log("test: ", responseData);

    return responseData;
  } catch (error) {
    console.error("error: ", error);
  }
};

export default async function Profile() {
  const data = (await fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT)))
    .data;
  // const meta = data.meta;

  // function loadMorePosts(): void {
  //   const nextPosts = meta!.pagination.start + meta!.pagination.limit;
  //   fetchData(nextPosts, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  // }

  // useEffect(() => {
  //   fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  // }, [fetchData]);

  return (
    <Suspense fallback={<Loader />}>
      <div className="relative pb-16">
        <Navigation />
        <div className="px-6 pt-16 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
          <div className="max-w-2xl mx-auto lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl mt-2">
              Blogs
            </h2>
            {data.length ? (
              <p className="mt-4 text-zinc-400">
                Uncovering the unexpected, documenting the awesome.
              </p>
            ) : (
              <p className="mt-4 text-zinc-400">Coming Soon...</p>
            )}
          </div>
          <div className="w-full h-px bg-zinc-800" />
          <Blog data={data} content="blog">
            {/* don't delete  */}

            {/* {meta!.pagination.start + meta!.pagination.limit <
            meta!.pagination.total && (
            <div className="flex justify-center">
              <button
                type="button"
                className="px-6 py-3 text-sm rounded-lg hover:underline  :bg-zinc-800 :text-zinc-400 rich-text"
                onClick={loadMorePosts}
              >
                Load more posts...
              </button>
            </div>
          )} */}
          </Blog>
        </div>
      </div>
    </Suspense>
  );
}
