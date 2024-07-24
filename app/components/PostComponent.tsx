import Link from "next/link";
import React from "react";
import { Post } from "../utils/interface";
import { formatDistanceToNow } from "date-fns";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import { DEFAULT_IMAGE_URL } from "../utils/constants";
import { Lora } from "next/font/google";

const lora = Lora({ subsets: ["latin"] });

interface Props {
  post: Post;
}
const PostComponent = ({ post }: Props) => {
  return (
    <Link
      href={`/posts/${post?.slug?.current}`}
      className="flex flex-col border-2 border-neutral-400 shadow-md rounded-md h-[320px] 
      hover:translate-y-[-4px] hover:shadow-lg transition-all duration-200
      dark:shadow-neutral-300 dark:border-neutral-300"
    >
      <div className="w-full h-36">
        <Image
          src={
            post.coverImage
              ? urlForImage(post?.coverImage)?.url()
              : DEFAULT_IMAGE_URL
          }
          alt="cover image"
          width={400}
          height={400}
          className="w-full h-full object-cover object-center rounded-[4px] rounded-b-none"
        />
      </div>
      <div className="flex bg-gray-200 dark:bg-neutral-500 py-2 justify-between px-2">
        <p className="my-2 text-xs text-gray-500 dark:text-gray-200 tracking-normal">
          {formatDistanceToNow(post?.publishedAt)} ago
        </p>
        <div className="flex gap-2 justify-center items-center">
          {post?.tags?.map((tag) => (
            <span key={tag._id} className="text-xs font-semibold text-gray-600 py-[4px] px-[6px] rounded-full bg-sky-200">
              {tag.name}
            </span>
          ))}
        </div>
      </div>
      <div className="h-full p-2 bg-gray-200 dark:bg-neutral-500 rounded-[4px] rounded-t-none flex-1 overflow-hidden">
        <div className="h-[calc(100%-10px)] overflow-hidden">
          <h2 className={`text-xl font-bold dark:text-white ${lora.className}`}>
            {post?.title}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default PostComponent;
