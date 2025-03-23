"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { PostListItem } from "@/types/post";
import { cn } from "@/lib/utils";

interface SubcategoryItemProps {
  subcategory: string;
  count: number;
  posts?: PostListItem[];
}

export default function SubcategoryItem({
  subcategory,
  count,
  posts = [],
}: SubcategoryItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const categoryPath = `/blog/${subcategory.toLowerCase()}`;
  const isDetailPage = posts.some(
    (post) => pathname === `${categoryPath}/${post.slug}`
  );
  const isCategoryPage = pathname === categoryPath;

  useEffect(() => {
    if (isDetailPage) {
      setIsOpen(true);
    }
  }, [isDetailPage]);

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // 카테고리 페이지에 있을 때만 드롭다운 토글
    if (isCategoryPage) {
      setIsOpen(!isOpen);
    } else if (!isOpen) {
      // 닫혀있을 때만 열기
      setIsOpen(true);
    }

    // 항상 카테고리 페이지로 이동
    router.push(categoryPath);
  };

  const handleArrowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center w-full">
        <button
          onClick={handleCategoryClick}
          className={cn(
            "flex-1 flex items-center py-1.5 px-3 rounded-l-md transition-all",
            "hover:bg-gray-50 group"
          )}
        >
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700 transition-colors group-hover:text-blue-600">
              {subcategory}
            </span>
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full transition-colors group-hover:bg-gray-200">
              {count}
            </span>
          </div>
        </button>
        <button
          onClick={handleArrowClick}
          className={cn(
            "p-1.5 hover:bg-gray-50 rounded-r-md transition-colors",
            isOpen && "bg-gray-50"
          )}
        >
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-gray-500 transition-colors hover:text-blue-600" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-500 transition-colors hover:text-blue-600" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="pl-5">
          {posts.length > 0 ? (
            posts.map((post) => {
              const postPath = `/blog/${subcategory.toLowerCase()}/${
                post.slug
              }`;
              const isActive = pathname === postPath;

              return (
                <Link
                  key={post.slug}
                  href={postPath}
                  scroll={true}
                  className={cn(
                    "block text-xs py-1.5 transition-colors border-l pl-2",
                    isActive
                      ? "text-blue-600 border-blue-600 bg-blue-50 font-medium"
                      : "text-gray-600 hover:text-blue-600 border-gray-200",
                    "hover:bg-gray-50"
                  )}
                >
                  {post.frontMatter.title}
                </Link>
              );
            })
          ) : (
            <div className="text-sm text-gray-500 py-1">No posts found</div>
          )}
        </div>
      )}
    </div>
  );
}
