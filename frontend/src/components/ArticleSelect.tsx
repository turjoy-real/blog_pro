import React from "react";
import Link from "next/link";

interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
    articles: {
      data: Array<{}>;
    };
  };
}

interface Article {
  id: number;
  attributes: {
    title: string;
    slug: string;
  };
}

function selectedFilter(current: string, selected: string) {
  return current === selected
    ? "px-3 py-1 rounded-lg hover:underline bg-gray-700 text-gray-100"
    : "px-3 py-1 rounded-lg hover:underline bg-gray-400 text-gray-900";
}

export default function ArticleSelect({
  categories,
  articles,
  params,
}: {
  categories: Category[];
  articles: Article[];
  params: {
    slug: string;
    category: string;
  };
}) {
  return (
    <div className="p-4 rounded-lg bg-gray-800 p relative pb-8">
      <h4 className="text-xl font-semibold text-center text-gray-400">
        Browse By Category
      </h4>

      <div>
        <div className="flex flex-wrap py-6 space-x-2 border-gray-400 justify-center">
          {categories.map((category: Category) => {
            if (category.attributes.articles.data.length === 0) return null;
            return (
              <Link
                href={`/blog/${category.attributes.slug}`}
                className={selectedFilter(
                  category.attributes.slug,
                  params.category
                )}
              >
                #{category.attributes.name}
              </Link>
            );
          })}
          <Link href={"/blog"} className={selectedFilter("", "filter")}>
            #all
          </Link>
        </div>

        {articles.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-center text-gray-400">
              Other Posts You May Like
            </h4>
            <div className="flex flex-col">
              {articles.map((article: Article) => {
                return (
                  <li className="text-center">
                    <Link
                      rel="noopener noreferrer"
                      href={`/blog/${params.category}/${article.attributes.slug}`}
                      className={`${"text-gray-500"}  hover:underline hover:text-gray-400 transition-colors duration-200`}
                    >
                      {article.attributes.title}
                    </Link>
                  </li>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
