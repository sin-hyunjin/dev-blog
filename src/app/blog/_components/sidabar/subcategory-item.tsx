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
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center w-full group ">
        <button
          onClick={handleCategoryClick}
          className={cn(
            "flex-1 flex items-center py-1.5 px-3 rounded-l-md transition-all",
            "hover:bg-muted/40",
            isOpen && "bg-muted-foreground/20 text-foreground"
          )}
        >
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold transition-colors uppercase">
              {subcategory}
            </span>
            <span
              className={cn(
                "text-xs text-background bg-muted px-1.5 py-0.5 rounded-full transition-colors font-semibold",
                // "group-hover:bg-background/50 group-hover:text-foreground",
                isOpen && "bg-background/70 text-foreground"
              )}
            >
              {count}
            </span>
          </div>
        </button>
        <button
          onClick={handleArrowClick}
          className={cn(
            "p-2 rounded-r-md transition-all",
            "hover:bg-muted",
            isOpen && "bg-muted-foreground/90 text-background"
          )}
        >
          {isOpen ? (
            <ChevronDown
              className={cn("h-4 w-4 transition-colors rounded-md")}
            />
          ) : (
            <ChevronRight
              className={cn("h-4 w-4 transition-colors rounded-md")}
            />
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
                      ? "text-muted-foreground  bg-muted/10 border-muted/70 font-semibold"
                      : "text-muted hover:text-muted-foreground border-muted-foreground/10",
                    "hover:bg-muted/5"
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
