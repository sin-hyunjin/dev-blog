import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
export default async function BlogList() {
  const posts = await getAllPosts();
  return (
    <div className=" mx-auto">
      <h1 className="text-2xl font-bold mb-6">📜 블로그 글 목록</h1>
      <ul>
        {posts.map(({ slug, frontMatter }) => (
          <li key={slug} className="mb-4">
            <Link
              href={`/blog/${frontMatter.subcategory?.toLowerCase()}/${slug}`}
              className="text-blue-500 hover:underline"
            >
              {frontMatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
