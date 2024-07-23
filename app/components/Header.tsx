import Link from "next/link";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Post } from "../utils/interface";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { DEFAULT_IMAGE_URL } from "../utils/constants";
import { Lora } from "next/font/google";

const lora = Lora({ subsets: ["latin"] });

interface Props {
  latestPost: Post;
}

const Header = ({ latestPost }: Props) => {
  return (
    <header className="flex gap-8 h-72 flex-col md:flex-row justify-center bg-gray-200 dark:bg-slate-300 py-8 px-4 rounded-md">
      <div className="hidden md:block">
        <Image
          src={
            latestPost?.coverImage
              ? urlForImage(latestPost?.coverImage)?.url()
              : DEFAULT_IMAGE_URL
          }
          alt="cover image"
          width={600}
          height={400}
          className="w-full h-full object-contain object-center rounded-md"
        />
      </div>
      <div className="w-full md:w-1/3 flex flex-col">
        <Link href={`/posts/${latestPost?.slug?.current}`}>
          <h1 className={`${lora.className} text-2xl font-bold hover:underline dark:text-gray-800`}>
            {latestPost?.title}
          </h1>
        </Link>
        <p className="text-xs text-slate-600 dark:text-gray-700 mt-2">
          {formatDistanceToNow(latestPost?.publishedAt)} ago
        </p>
        <p className="text-sm my-auto">{latestPost?.excerpt}</p>
      </div>
    </header>
  );
};

export default Header;
