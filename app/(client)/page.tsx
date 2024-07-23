import { client } from "@/sanity/lib/client";
import Header from "../components/Header";
import { Post } from "../utils/interface";
import PostComponent from "../components/PostComponent";
import FilterBar from "../components/FilterBar";
import Navbar from "../components/Navbar";
import { Lora } from "next/font/google";

const lora = Lora({ subsets: ["latin"] });
async function getPosts() {
  const query = `
  *[_type == "post"] | order(publishedAt desc) {
    title,
    coverImage,
    slug,
    publishedAt,
    excerpt,
    tags[]-> {
      _id,
      slug,
      name
    },
    category-> {
      name,
    }

  }
  `;
  const data = await client.fetch(query);
  return data;
}

interface SearchParams {
  filter?: string;
  search: string;
}

export const revalidate = 60;

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { filter, search } = searchParams;

  const posts: Post[] = await getPosts();
  let filteredPosts: Post[] = [];

  filteredPosts = posts.filter((post) =>
    post.category?.name == filter)
  
  if (!filter || filter === "All") {
    filteredPosts = posts;
  }
  if (search) {
    filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <>
      <div className="mb-12">
        <Navbar />
      </div>

      <div className="text-center mt-6 p-4">
        <h1 className={`text-3xl font-bold ${lora.className}`}>
          Hi, Welcome to Data Blog!
        </h1>
        <p
          className={`text-gray-600 dark:text-gray-300 text-semibold tracking-wide mt-2`}
        >
          Data is valuable you know it, but how? Let's explore through these
          articles.
        </p>
      </div>
      <Header latestPost={posts[0]} />
      <div className="mt-10">
        <FilterBar />
        <div className="grid grid-template-columns-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredPosts?.length > 0 &&
            filteredPosts?.map((post) => (
              <PostComponent key={post?._id} post={post} />
            ))}
        </div>
      </div>
    </>
  );
}
