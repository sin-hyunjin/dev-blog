"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { TocEntry } from "@/types/post";

// 목차 컴포넌트
export default function TableOfContents() {
  // 컴포넌트 마운트 상태 관리
  const [mounted, setMounted] = useState(false);
  // 목차 항목들 상태 관리
  const [headings, setHeadings] = useState<TocEntry[]>([]);
  // 현재 활성화된 목차 항목 ID 관리
  const [activeId, setActiveId] = useState<string>("");
  const pathname = usePathname();

  // 컴포넌트 마운트/언마운트 처리
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // 헤딩 텍스트를 URL 친화적인 형태로 변환하는 함수
  const getHeadingSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, "-") // 띄어쓰기를 하이픈으로 변환
      .replace(/[^a-z0-9-]/g, ""); // 알파벳, 숫자, 하이픈 외의 문자 제거
  };

  // MDX 문서에서 헤딩 태그들을 추출하여 목차 생성
  useEffect(() => {
    if (!mounted) return;

    const getHeadings = () => {
      const elements = document.querySelectorAll(
        ".prose h1, .prose h2, .prose h3"
      );

      const items: TocEntry[] = Array.from(elements).map((element, index) => {
        const text = element.textContent || "";
        const slug = getHeadingSlug(text);
        const id = `heading-${index}`;

        // 헤딩 요소에 ID와 스크롤 여백 추가
        element.id = id;
        element.classList.add("scroll-mt-24");

        return {
          id,
          value: text,
          slug, // URL 친화적인 형태의 텍스트 추가
          depth: Number(element.tagName.charAt(1)),
        };
      });

      setHeadings(items);
    };

    setTimeout(getHeadings, 100);
  }, [pathname, mounted]);

  // Intersection Observer를 사용하여 현재 보이는 헤딩 감지
  useEffect(() => {
    if (!mounted) return;

    // 헤딩의 가시성과 위치를 계산하는 함수
    const calculateHeadingState = (entry: IntersectionObserverEntry) => {
      const rect = entry.boundingClientRect;
      const visibility = Math.min(
        (window.innerHeight - rect.top) / rect.height,
        rect.bottom / rect.height
      );

      return {
        id: entry.target.id,
        top: rect.top,
        visibility,
      };
    };

    // 가장 적절한 헤딩을 선택하는 함수
    const selectBestHeading = (
      headingStates: ReturnType<typeof calculateHeadingState>[]
    ) => {
      return headingStates.reduce((prev, current) => {
        if (current.visibility > prev.visibility) return current;
        if (current.visibility === prev.visibility) {
          return current.top < prev.top ? current : prev;
        }
        return prev;
      });
    };

    // Intersection Observer 설정
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleHeadings = entries.filter((entry) => entry.isIntersecting);

        if (visibleHeadings.length > 0) {
          const headingStates = visibleHeadings.map(calculateHeadingState);
          const bestHeading = selectBestHeading(headingStates);
          setActiveId(bestHeading.id);
        }
      },
      {
        rootMargin: "-20% 0px -70%", // 상단 20%와 하단 70% 영역을 감지
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      }
    );

    // 모든 헤딩 요소 관찰 시작
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings, mounted]);

  // 초기 렌더링 조건 체크
  if (!mounted) return null;
  if (pathname.split("/").length < 4) return null;
  if (!headings.length) return null;

  // 목차 UI 렌더링
  return (
    <aside className="w-64 flex-shrink-0 sticky top-24 h-[calc(100vh-6rem)] border-l border-gray-200 pl-6">
      <div className="overflow-y-auto h-full py-8">
        <h2 className="text-xs font-semibold text-gray-600 uppercase">
          On this page
        </h2>
        <nav className="mt-4 space-y-2">
          {headings.map((heading) => (
            <Link
              key={heading.id}
              href={`#${heading.slug}`}
              className={`
                block hover:text-blue-600 transition-colors
                ${activeId === heading.id ? "text-blue-600" : "text-gray-700"}
                ${heading.depth === 1 ? "pl-0 text-sm" : ""}
                ${heading.depth === 2 ? "pl-4 text-[13px]" : ""}
                ${heading.depth === 3 ? "pl-8 text-[12px]" : ""}
              `}
            >
              {heading.value}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
