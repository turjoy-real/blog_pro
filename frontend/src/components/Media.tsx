// import { getStrapiMedia } from "../utils/api-helpers";
// import Image from "next/image";

// interface MediaProps {
//   file: {
//     data: {
//       id: string;
//       attributes: {
//         url: string;
//         name: string;
//         alternativeText: string;
//       };
//     };
//   };
// }

// export default function Media({ data }: { data: MediaProps }) {
//   const imgUrl = getStrapiMedia(data.file.data.attributes.url);
//   return (
//     <div className="flex items-center justify-center mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 bg-grey-300">
//       <Image
//         src={imgUrl || ""}
//         alt={data.file.data.attributes.alternativeText || "none provided"}
//         className="object-cover w-full rounded-lg overflow-hidden"
//         // sizes="100vw"
//         // style={{
//         //   width: '100%',
//         //   height: 'auto',
//         // }}
//       width={400}
//       height={400}
//         // width={400}
//         // // fill
//         // height={400}
//       />
//     </div>
//   );
// }

import { getStrapiMedia } from "../utils/api-helpers";
import Image from "next/image";

interface MediaProps {
  file: {
    data: {
      id: string;
      attributes: {
        url: string;
        name: string;
        alternativeText: string;
      };
    };
  };
}

export default function Media({ data }: { data: MediaProps }) {
  const imgUrl = getStrapiMedia(data.file.data.attributes.url);
  return (
    <div className="flex items-center justify-center mt-8 lg:mt-0">
      <Image
        src={imgUrl || ""}
        alt={data.file.data.attributes.alternativeText || "none provided"}
        className="object-cover w-full h-full rounded-lg overflow-hidden"
        width={400}
        height={400}
      />
    </div>
  );
}
