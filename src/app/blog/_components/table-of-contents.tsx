"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { TocEntry } from "@/types/post";
import { cn } from "@/lib/utils";

export default function TableOfContents() {
  const [mounted, setMounted] = useState(false);
  const [headings, setHeadings] = useState<TocEntry[]>([]);
  const [activeIds, setActiveIds] = useState<string[]>([]);
  const pathname = usePathname();

  // 마운트 상태 관리
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // 헤딩 슬러그 생성 함수
  const getHeadingSlug = useCallback((text: string) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }, []);

  // 헤딩 요소 가져오기
  const getHeadings = useCallback(() => {
    const elements = document.querySelectorAll(
      ".prose h1, .prose h2, .prose h3"
    );

    if (elements.length === 0) {
      return false;
    }

    const items: TocEntry[] = Array.from(elements).map((element, index) => {
      const text = element.textContent || "";
      const slug = getHeadingSlug(text);
      const id = `heading-${index}`;

      element.id = id;
      element.classList.add("scroll-mt-24");

      return {
        id,
        value: text,
        slug,
        depth: Number(element.tagName.charAt(1)),
      };
      3;
    });

    setHeadings(items);
    return true;
  }, [getHeadingSlug]);

  // 헤딩 요소 검색 및 설정
  useEffect(() => {
    if (!mounted) return;

    // 초기 시도
    const success = getHeadings();

    // 초기 시도가 실패하면 여러 번 다시 시도
    if (!success) {
      const interval = setInterval(() => {
        const success = getHeadings();
        if (success) {
          clearInterval(interval);
        }
      }, 200);

      // 최대 5초 후 시도 중단
      const timeout = setTimeout(() => clearInterval(interval), 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [pathname, mounted, getHeadings]);

  // Intersection Observer 설정
  useEffect(() => {
    if (!mounted || headings.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        setActiveIds((prev) => {
          if (entry.isIntersecting) {
            return prev.includes(entry.target.id)
              ? prev
              : [...prev, entry.target.id];
          } else {
            return prev.filter((id) => id !== entry.target.id);
          }
        });
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings, mounted]);

  // 렌더링 조건 확인
  if (!mounted || pathname.split("/").length < 4 || !headings.length)
    return null;

  return (
    <aside
      className={cn(
        "hidden w-60 flex-shrink-0 sticky top-24 h-[calc(100vh-6rem)] border-l border-border-dashed pl-6 m-5",
        "lg:block"
      )}
    >
      {/* 고정된 헤더 */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm py-4 z-10">
        <h2 className="text-xs font-semibold uppercase">On this page</h2>
      </div>

      {/* 마스크 컨테이너 */}
      <div className="relative h-[calc(100%-3rem)]">
        {/* 상단 페이드 아웃 효과 */}
        <div className="absolute -top-1 left-0 right-0 h-4 bg-gradient-to-b from-background to-transparent z-10" />

        {/* 스크롤되는 내용 */}
        <div className="overflow-y-auto h-full ">
          <nav className="space-y-2 pt-2">
            {headings.map((heading) => (
              <HeadingLink
                key={heading.id}
                heading={heading}
                isActive={activeIds.includes(heading.id)}
              />
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}

// 헤딩 링크 컴포넌트 추출
function HeadingLink({
  heading,
  isActive,
}: {
  heading: TocEntry;
  isActive: boolean;
}) {
  return (
    <Link
      href={`#${heading.id}`}
      className={`
        block hover:text-black transition-colors  
        ${
          isActive
            ? "text-muted-foreground border-l-3 border-[(#8B8C8F] pl-2"
            : "text-muted"
        }
        ${heading.depth === 1 ? "pl-0 text-sm" : ""}
        ${heading.depth === 2 ? "pl-4 text-[13.5px]" : ""}
        ${heading.depth === 3 ? "pl-8 text-[13px]" : ""}
      `}
    >
      {heading.value}
    </Link>
  );
}
