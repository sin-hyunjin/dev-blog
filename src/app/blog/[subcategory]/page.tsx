import { getPostsBySubCategory } from "@/lib/mdx";
import Link from "next/link";

interface SubCategoryPageProps {
  params: Promise<{ subcategory: string }> | { subcategory: string };
}
export default async function SubCategoryPage({
  params,
}: SubCategoryPageProps) {
  const resolvedParams = await Promise.resolve(params);

  const posts = await getPostsBySubCategory(resolvedParams.subcategory);

  return (
    <div className="space-y-8">
      <div className="grid gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.frontMatter.subcategory?.toLowerCase()}/${
              post.slug
            }`}
            className="block p-6  rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">
              {post.frontMatter.title}
            </h2>
            {post.frontMatter.description && (
              <p className="text-gray-600">{post.frontMatter.description}</p>
            )}
            <div className="mt-4 text-sm text-gray-500">
              {post.frontMatter.date}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
