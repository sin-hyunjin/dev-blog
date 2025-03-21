"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TableOfContents() {
  const pathname = usePathname();

  /**
   * pathname.split("/").length < 4 조건을 추가하여 URL 구조를 체크합니다
   * /blog (length = 2)
   * /blog/subcategory (length = 3)
   * /blog/subcategory/post-slug (length = 4)
   * URL 구조가 /blog/subcategory/post-slug 형태일 때만 목차가 표시됩니다
   * 블로그 메인 페이지(/blog)나 카테고리 목록 페이지(/blog/subcategory)에서는 목차를 숨김
   */
  if (pathname.split("/").length < 4) {
    return null;
  }

  return (
    <aside className="  border-l  border-gray-200 px-6 py-8 overflow-y-auto sticky top-24 h-[calc(100vh-6rem)] w-64 flex-shrink-0">
      <h2 className="text-xs font-semibold text-gray-600 uppercase">
        On this page
      </h2>
      <nav className="mt-4 space-y-2">
        <Link
          href="#"
          className="block text-xs text-gray-700 hover:text-blue-600"
        >
          Handling expected errors
        </Link>
        <Link
          href="#"
          className="block text-xs text-gray-700 hover:text-blue-600"
        >
          Server Actions
        </Link>
        <Link
          href="#"
          className="block text-xs text-gray-700 hover:text-blue-600"
        >
          Global errors
        </Link>
      </nav>
    </aside>
  );
}
