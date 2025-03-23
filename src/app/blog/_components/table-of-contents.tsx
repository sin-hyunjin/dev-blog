"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { TocEntry } from "@/types/post";

export default function TableOfContents() {
  const [mounted, setMounted] = useState(false);
  const [headings, setHeadings] = useState<TocEntry[]>([]);
  const [activeIds, setActiveIds] = useState<string[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const getHeadingSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

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

        element.id = id;
        element.classList.add("scroll-mt-24");

        return {
          id,
          value: text,
          slug,
          depth: Number(element.tagName.charAt(1)),
        };
      });

      setHeadings(items);
    };

    setTimeout(getHeadings, 100);
  }, [pathname, mounted]);

  useEffect(() => {
    if (!mounted) return;

    // Intersection Observer 설정 수정
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setActiveIds((prev) => {
            if (entry.isIntersecting) {
              // 이미 활성화된 ID가 아닌 경우에만 추가
              return prev.includes(entry.target.id)
                ? prev
                : [...prev, entry.target.id];
            } else {
              // 화면에서 벗어난 경우 제거
              return prev.filter((id) => id !== entry.target.id);
            }
          });
        });
      },
      {
        // viewport에 조금이라도 보이면 감지하도록 설정
        root: null,
        rootMargin: "0px",
        threshold: 0.1, // 10%만 보여도 활성화
      }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings, mounted]);

  if (!mounted) return null;
  if (pathname.split("/").length < 4) return null;
  if (!headings.length) return null;

  return (
    <aside className="w-64 flex-shrink-0 sticky top-24 h-[calc(100vh-6rem)] border-l border-gray-200 pl-6 m-5">
      <div className="overflow-y-auto h-full py-8">
        <h2 className="text-xs font-semibold text-gray-600 uppercase">
          On this page
        </h2>
        <nav className="mt-4 space-y-2">
          {headings.map((heading) => (
            <Link
              key={heading.id}
              href={`#${heading.id}`}
              className={`
                block hover:text-black transition-colors  
                ${
                  activeIds.includes(heading.id)
                    ? "text-black/80 border-l-3 border-[(#8B8C8F] pl-2"
                    : "text-black/50"
                }
                ${heading.depth === 1 ? "pl-0 text-sm" : ""}
                ${heading.depth === 2 ? "pl-4 text-[13.5px]" : ""}
                ${heading.depth === 3 ? "pl-8 text-[13px]" : ""}
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
