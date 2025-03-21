// MDX 관련 타입 정의
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

export type Source = MDXRemoteSerializeResult;

export interface FrontMatter {
  title: string;
  date?: string;
  description?: string;
  category?: string;
  subcategory?: string;
  // 추가적인 메타데이터 필드들 필요시 추가
}

export interface TocEntry {
  id: string;
  depth: number;
  value: string;
  slug: string;
  children?: TocEntry[];
}

export interface Post {
  slug: string;
  frontMatter: FrontMatter;
  mdxSource: Source;
  toc: TocEntry[];
}

export interface PostListItem {
  slug: string;
  frontMatter: FrontMatter;
}

// 카테고리 집계를 위한 타입
export interface CategoryCount {
  [category: string]: {
    [subcategory: string]: number;
  };
}

// 라우트 파라미터 타입
export interface BlogParams {
  params: Promise<{ slug: string }> | { slug: string };
}
