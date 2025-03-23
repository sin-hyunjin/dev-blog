import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import extractToc from "@stefanprobst/rehype-extract-toc";
import type {
  EnhancedCategoryCount,
  FrontMatter,
  Post,
  PostListItem,
  TocEntry,
} from "@/types/post";

// postsDirectory : 게시글이 저장된 디렉토리 정의
const postsDirectory = path.join(process.cwd(), "src/_posts");

// getPost : slug를 기반으로 단일 게시글을 가져오는 함수
export async function getPost(slug: string): Promise<Post | null> {
  // 게시글 파일의 전체 경로 구성
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  // 게시글 파일의 내용 읽기
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  // 파일 내용에서 front matter와 콘텐츠 추출
  const { data, content } = matter(fileContents);

  let toc: TocEntry[] = []; // let으로 변경

  // 콘텐츠를 MDX 형식으로 직렬화
  const mdxSource = await serialize(content, {
    scope: data as unknown as Record<string, unknown>,
    mdxOptions: {
      rehypePlugins: [
        [
          extractToc,
          {
            headings: ["h1", "h2", "h3"],
            callback: (tableOfContents: TocEntry[]) => {
              toc = tableOfContents;
            },
          },
        ],
      ],
    },
  });

  // slug, front matter, 직렬화된 콘텐츠를 포함한 게시글 데이터 반환
  return { slug, frontMatter: data as unknown as FrontMatter, mdxSource, toc };
}

// getAllPosts :  모든 게시글을 게시글 항목 리스트로 가져오는 함수
export async function getAllPosts(): Promise<PostListItem[]> {
  // 게시글 디렉토리의 모든 파일 읽기
  const files = fs.readdirSync(postsDirectory);
  // 각 파일의 slug와 front matter를 추출하여 매핑
  return files.map((file) => {
    // 파일 확장자를 제거하여 slug 얻기
    const slug = file.replace(/\.mdx$/, "");
    // 게시글 파일의 전체 경로 구성
    const fullPath = path.join(postsDirectory, file);
    // 파일 내용에서 front matter 추출
    const { data } = matter(fs.readFileSync(fullPath, "utf-8"));
    // slug와 front matter를 포함한 게시글 항목 반환
    return { slug, frontMatter: data as unknown as FrontMatter };
  });
}

// 카테고리별 포스트 수를 계산하는 함수 추가
export async function getEnhancedSubCategoryCount(): Promise<EnhancedCategoryCount> {
  const files = fs.readdirSync(postsDirectory);
  const categoryData: EnhancedCategoryCount = {};

  files.forEach((file) => {
    const fullPath = path.join(postsDirectory, file);
    const { data } = matter(fs.readFileSync(fullPath, "utf-8"));
    const frontMatter = data as unknown as FrontMatter;
    const slug = file.replace(/\.mdx$/, "");

    if (!frontMatter.category || !frontMatter.subcategory) {
      return;
    }

    if (!categoryData[frontMatter.category]) {
      categoryData[frontMatter.category] = {};
    }

    if (!categoryData[frontMatter.category][frontMatter.subcategory]) {
      categoryData[frontMatter.category][frontMatter.subcategory] = {
        count: 0,
        posts: [],
      };
    }

    categoryData[frontMatter.category][frontMatter.subcategory].count++;
    categoryData[frontMatter.category][frontMatter.subcategory].posts.push({
      slug,
      frontMatter,
    });
  });

  return categoryData;
}

// 특정 카테고리의 포스트를 가져오는 함수 추가
export async function getPostsBySubCategory(
  subcategory: string
): Promise<PostListItem[]> {
  const files = fs.readdirSync(postsDirectory);

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, file);
      const { data } = matter(fs.readFileSync(fullPath, "utf-8"));
      const frontMatter = data as unknown as FrontMatter;

      return { slug, frontMatter };
    })
    .filter(
      (post) =>
        post.frontMatter.subcategory?.toLowerCase() ===
        subcategory?.toLowerCase()
    );
}
