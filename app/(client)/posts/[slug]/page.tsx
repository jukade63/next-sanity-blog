import Navbar from "@/app/components/Navbar";
import Toc from "@/app/components/Toc";
import { slugify } from "@/app/utils/helpers";
import { Post } from "@/app/utils/interface";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import CodeBlock from "@/app/components/CodeBlock";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: "700" });

interface Params {
  params: {
    slug: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

async function getPost(slug: string) {
  const query = `
  *[_type == "post" && slug.current == "${slug}"][0] {
    title,
    coverImage,
    slug,
    publishedAt,
    excerpt,
    _id,
    "headings": body[style in ["h2", "h3", "h4", "h5", "h6"]],
    body,
    tags[]-> {
      _id,
      slug,
      name
    },
  }
  `;

  const post = await client.fetch(query);
  return post;
}

async function getRelatedPosts(slug: string, postId: string) {
  const query = `
  *[_type == "post" && slug.current match "${slug.slice(0, -10)}*" && _id != "${postId}"] {
    title,
    slug,
   
  } | order(publishedAt desc) [0..3]
  `;

  const data = await client.fetch(query);
  return data;
}

export const revalidate = 60;

export async function generateMetadata({
  params,
}: Params): Promise<Metadata | undefined> {
  const post: Post = await getPost(params?.slug);
  if (!post) {
    return;
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      locale: "en_US",
      url: `https://next-cms-blog-ce.vercel.app/${params.slug}`,
      siteName: "Data Digit",
      images: [
        // {
        //   url: post.image,
        // }
        // {
        //   url: urlForImage(post?.body?.find((b: any) => b._type === "image")).width(1200).height(630).url(),
        //   width: 1200,
        //   height: 630,
        // },
      ],
    },
  };
}

const SinglePost = async ({ params, searchParams }: Params) => {
  const post: Post = await getPost(params?.slug);
  console.log(post);

  if (!post) {
    notFound();
  }

  const relatedPosts: Post[] = await getRelatedPosts(params?.slug, post?._id);

  return (
    <div>
      <Navbar hasSearch={false} />
      <Image
        src={urlForImage(post?.coverImage).url()}
        alt={post?.title}
        width={1200}
        height={300}
        className="w-full h-[300px] object-cover object-center rounded-md"
      ></Image>
      <h1 className="text-3xl text-center font-bold mt-10">{post?.title}</h1>
      <p className="text-sm text-gray-500 text-center mt-2">
        {formatDistanceToNow(post?.publishedAt)} ago
      </p>

      <p className="mt-5 text-gray-600 dark:text-gray-300">{post.excerpt}</p>
      <div className="flex flex-col-reverse lg:flex-row lg:gap-5 items-center lg:items-start">
        <div
          className="mt-14 text-justify max-w-4xl prose-headings:my-3 prose-heading:text-2xl prose-p:mb-3
                        prose-p:leading-7 prose-li:list-disc prose-li:leading-7 prose-li:ml-4"
        >
          <PortableText value={post?.body} components={ptComponents} />
        </div>
        <div className="mt-5 flex justify-center min-w-28">
          <Toc headings={post?.headings} />
        </div>
      </div>
      <div className="mt-5">
        {post?.tags?.map((tag) => (
          <span key={tag?._id} className="mr-2 py-[6px] px-4 rounded-full text-sm bg-sky-200 dark:bg-gray-950 border dark:border-gray-900">
            {tag.name}
          </span>
        ))}
      </div>
      <div>
        {relatedPosts.length > 0 && (
          <h2 className="text-xl font-bold mt-5 mb-2">Related Posts</h2>
        )}
        <ul className="flex flex-col gap-2 items-start">
          {relatedPosts.map((post) => (
            <li
              key={post?._id}
              className="list-disc list-inside pl-5 hover:underline text-[15px] relative list-item-before"
            >
              <Link href={`/posts/${post?.slug.current}`}>{post?.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-5">
        <Link href="/">
          <h2 className="text-xl font-bold mt-5 underline underline-offset-2">
            All Articles
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default SinglePost;

const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <Image
          src={urlForImage(value).url()}
          alt="Post"
          width={value.width || 600}
          height={value.height || 300}
          className="mb-5"
        />
      );
    },
    code: ({ value }: any) => {
      return <CodeBlock value={value} />;
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <Link href={value.href} rel={rel} className="text-amber-600 underline">
          {children}
        </Link>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => <ul className="pl-5">{children}</ul>,
    number: ({ children }: any) => (
      <ol className="list-decimal pl-5">{children}</ol>
    ),
  },
  block: {
    h2: ({ value }: any) => (
      <h2
        id={slugify(value.children[0].text)}
        className={`text-3xl ${roboto.className}`}
      >
        {value.children[0].text}
      </h2>
    ),
    h3: ({ value }: any) => (
      <h3
        id={slugify(value.children[0].text)}
        className={`text-3xl font-bold  ${roboto.className}`}
      >
        {value.children[0].text}
      </h3>
    ),
    h4: ({ value }: any) => (
      <h4
        id={slugify(value.children[0].text)}
        className={`text-2xl  ${roboto.className}`}
      >
        {value.children[0].text}
      </h4>
    ),
    h5: ({ value }: any) => (
      <h5
        id={slugify(value.children[0].text)}
        className={`text-xl ${roboto.className}`}
      >
        {value.children[0].text}
      </h5>
    ),
    h6: ({ value }: any) => (
      <h6 id={slugify(value.children[0].text)} className="text-xl  mb-3">
        {value.children[0].text}
      </h6>
    ),
  },
};
