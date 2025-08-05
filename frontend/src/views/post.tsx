"use client";

import { formatDate, getStrapiMedia } from "@/utils/api-helpers";
import { postRenderer } from "@/utils/post-renderer";
import Image from "next/image";
import { Header } from "../app/blog/[category]/[slug]/header";
// import { NavigationEvents } from "../components/navigation-events";
import { ReactNode, useEffect, useState } from "react";

interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
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
    blocks: any[];
    publishedAt: string;
    views: number;
  };
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Post({
  data,
  goBack,
  url,
}: {
  data: Article;
  goBack: string;
  url: string;
}) {
  const { publishedAt, cover, authorsBio } = data.attributes;

  const author = authorsBio.data?.attributes;
  const imageUrl = getStrapiMedia(cover.data?.attributes.url);
  const authorImgUrl = getStrapiMedia(
    authorsBio.data?.attributes.avatar.data.attributes.url
  );
  const [modal, setModal] = useState(false);
  const [views, setViews] = useState(0);

  function buttonHandler() {
    // alert('Hi there!');
    setModal(true);
  }

  // Modal.tsx

  const overlayClasses = modal
    ? "fixed inset-0 bg-gray-800 bg-opacity-90"
    : "hidden";

  const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const modalClasses = isOpen
      ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-950 p-4 shadow-md z-30 rounded"
      : "hidden";

    return (
      <div className={modalClasses}>
        <div className="overflow-y-auto max-h-80 p-8">{children}</div>
        <button
          className="absolute top-0 right-0 m-4 text-gray-300 hover:text-gray-800"
          onClick={onClose}
        >
          <div className="text-2xl">&#9746;</div>
        </button>
      </div>
    );
  };

  async function getViews() {
    try {
      const res = await fetch(`${url}/views/${data.attributes.slug}.json`, {
        cache: "no-store",
      });
      const resData = await res.json();
      console.log(
        "data: ",
        `${url}/views/${data.attributes.slug}.json`,
        resData
      );

      if (resData === null) {
        const res = await fetch(`${url}/views/${data.attributes.slug}.json`, {
          method: "PUT",
          body: JSON.stringify(1),
          cache: "no-store",
        });
        const resData = await res.json();
        if (resData) {
          setViews(1);
        }
      } else {
        const res = await fetch(`${url}/views/${data.attributes.slug}.json`, {
          method: "PUT",
          body: JSON.stringify(Number(resData) + 1),
          cache: "no-store",
        });
        setViews(Number(resData) + 1);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    getViews();
  }, [data.attributes.slug]);

  return (
    <article className="">
      <Header project={data} views={views} image={imageUrl} goBack={goBack} />
      <div className={overlayClasses} onClick={() => setModal(false)}></div>
      <Modal isOpen={modal} onClose={() => setModal(false)}>
        <div className="flex flex-col">
          {data.attributes.blocks.map((section: any, index: number) =>
            section.index ? (
              <a
                key={index}
                href={`#${section.slug}`}
                className="m-2 text-gray-400"
                onClick={() => setModal(false)}
              >
                {section.index}
              </a>
            ) : null
          )}
        </div>
      </Modal>
      <button
        onClick={buttonHandler}
        title="Contact Sale"
        className="fixed z-90 bottom-10 right-8 bg-gray-600 w-14 h-14 rounded-full drop-shadow-lg flex justify-center items-center text-black text-4xl hover:bg-gray-700 hover:drop-shadow-2xl hover:animate-bounce duration-300 z-20"
      >
        &#8801;
      </button>
      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <div className="space-y-6">
          <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-400">
            <div className="flex items-center md:space-x-2">
              {authorImgUrl && (
                <Image
                  src={authorImgUrl}
                  alt="article cover image"
                  width={400}
                  height={400}
                  className="w-14 h-14 border rounded-full dark:bg-gray-500 dark:border-gray-700"
                />
              )}
              <p className="text-md dark:text-gray-400">
                {author && author.name} • {formatDate(publishedAt)}
              </p>
            </div>
          </div>
        </div>
        {data.attributes.blocks.map((section: any, index: number) => (
          <div key={index}>{postRenderer(section, index)}</div>
        ))}
      </article>
    </article>
  );
}
