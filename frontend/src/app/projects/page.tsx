import { Suspense } from "react";
import { fetchAPI } from "../../utils/fetch-api";

import Loader from "../../components/Loader";
import { Navigation } from "../../components/nav";
import Blog from "../../views/blog-list";

interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

interface category {
  attributes: {
    name: string;
    slug: string;
  };
}

interface Article {
  id: 4;
  attributes: {
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    category: {
      data: category;
    };
    categories: { data: category[] };
    authorsBio: {
      data: {
        attributes: {
          name: string;
          avatar: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
  };
}

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
            $eq: "projects",
          },
        },
      },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const responseData = await fetchAPI(path, urlParamsObject, options);
    return responseData;
  } catch (error) {
    console.error(error);
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
              Projects
            </h2>
            {data.length ? (
              <p className="mt-4 text-zinc-400">
                Some of the projects are from work and some are on my own time.
              </p>
            ) : (
              <p className="mt-4 text-zinc-400">Coming Soon...</p>
            )}
          </div>

          <div className="w-full h-px bg-zinc-800" />
          <Blog data={data} content="projects"></Blog>

          {/* {data.length
          ? meta!.pagination.start + meta!.pagination.limit <
              meta!.pagination.total && (
              <div className="flex justify-center">
                <button
                  type="button"
                  className="px-6 py-3 text-sm rounded-lg hover:underline :bg-zinc-800 :text-zinc-400 rich-text"
                  onClick={loadMorePosts}
                >
                  Load more posts...
                </button>
              </div>
            )
          : null} */}
        </div>
      </div>
    </Suspense>
  );
}
