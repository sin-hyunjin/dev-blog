import { getPost } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/mdx";
import MDXRenderer from "@/components/mdx-renderer";
import { ThemeToggleColor } from "@/components/theme-toggle";
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(({ slug }) => ({ slug }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const post = await getPost(resolvedParams.slug);

  if (!post) return notFound();

  const components = {
    ThemeToggle: ThemeToggleColor,
  };

  return (
    <article className="prose dark:prose-invert  mx-auto p-6 max-w-88rem ">
      <h1>{post.frontMatter.title}</h1>
      <div>{post.frontMatter.date}</div>
      <MDXRenderer source={post.mdxSource} components={components} />
    </article>
  );
}
