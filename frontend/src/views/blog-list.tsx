import Link from "next/link";
import { formatDate } from "../utils/api-helpers";
import { Card } from "../components/card";

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
    category: { data: category };
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

export default function PostList({
  data: articles,
  children,
  content,
}: {
  data: Article[];
  children?: React.ReactNode;
  content: string;
}) {
  // console.log("data: ", articles);

  return (
    <section className="container p-6 mx-auto space-y-6 sm:space-y-12">
      <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles &&
          articles.map((article, i) => {
            // const imageUrl = getStrapiMedia(
            //   article.attributes.cover.data?.attributes.url
            // );

            const categories = article.attributes.categories?.data;

            const category = categories[0]?.attributes;
            // const authorsBio = article.attributes.authorsBio.data?.attributes;

            // const avatarUrl = getStrapiMedia(
            //   authorsBio?.avatar.data.attributes.url
            // );

            // console.log(
            //   "1: ",
            //   `/${content}/${category?.slug}/${article.attributes.slug}`
            // );

            return (
              <Card key={i}>
                <Link
                  href={`/${content}/${category?.slug}/${article.attributes.slug}`}
                  key={article.id}
                  className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-900 lg:w-[300px] xl:min-w-[375px] rounded-2xl overflow-hidden shadow-lg"
                >
                  {/* {imageUrl && (
                  <Image
                    alt="presentation"
                    width="240"
                    height="240"
                    className="object-cover w-full h-44 "
                    src={imageUrl}
                  />
                )} */}
                  <div className="p-6 space-y-2 relative">
                    {/* {avatarUrl && (
                    <Image
                      alt="avatar"
                      width="80"
                      height="80"
                      src={avatarUrl}
                      className="rounded-full h-16 w-16 object-cover absolute -top-8 right-4"
                    />
                  )} */}

                    {/* <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                  {article.attributes.title}
                </h3> */}
                    {/* <h2
									id="featured-post"
									className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-sans"
								>
									{article.attributes.title}
								</h2> */}

                    <h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white --font-sans">
                      {article.attributes.title}
                    </h2>

                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">
                        {formatDate(article.attributes.publishedAt)}
                      </span>
                      {/* {authorsBio && (
                      <span className="text-xs dark:text-gray-400">
                        {authorsBio.name}
                      </span>
                    )} */}
                    </div>
                    <p className="z-20 mt-4 text-sm  duration-1000 text-zinc-400 group-hover:text-zinc-200">
                      {article.attributes.description}
                    </p>
                    {/* <p className="py-4">{article.attributes.description}</p> */}
                  </div>
                </Link>
              </Card>
            );
          })}
      </div>
      {children && children}
    </section>
  );
}
