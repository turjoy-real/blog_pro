// import type { Project } from "@/.contentlayer/generated";
import Link from "next/link";
import { Eye, View } from "lucide-react";

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
	  category: {data: category};
      categories: {data: category[]};
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
type Props = {
	project: Article;
	views: number;
};



export const Article: React.FC<Props> = ({ project, views }) => {

	const categories = project.attributes.categories?.data

    const category = categories[0]?.attributes;
	return (
		<Link href={`/projects/${category.slug}/${project.attributes.slug}`}>
			<article className="p-4 md:p-8">
				<div className="flex justify-between gap-2 items-center">
					<span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
						{project.attributes.updatedAt ? (
							<time dateTime={new Date(project.attributes.updatedAt).toISOString()}>
								{Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
									new Date(project.attributes.updatedAt),
								)}
							</time>
						) : (
							<span>SOON</span>
						)}
					</span>
					<span className="text-zinc-500 text-xs  flex items-center gap-1">
						<Eye className="w-4 h-4" />{" "}
						{Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
					</span>
				</div>
				<h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-sans">
					{project.attributes.title}
				</h2>
				<p className="z-20 mt-4 text-sm  duration-1000 text-zinc-400 group-hover:text-zinc-200">
					{project.attributes.description}
				</p>
			</article>
		</Link>
	);
};
