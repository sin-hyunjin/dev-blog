"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // 경로 세그먼트에 따른 표시 이름 매핑
  const getBreadcrumbName = (segment: string) => {
    if (segment === "blog") return "Blog";
    // URL에서 사용된 소문자를 원래 형태로 표시
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  return (
    <div className="mb-8">
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground/70">
        {/* Home 링크 항상 표시 */}
        {pathname === "/blog" && (
          <Link href="/blog" className="hover:text-primary transition-colors">
            Home
          </Link>
        )}
        <ChevronRightIcon className="h-4 w-4 mx-2 text-muted-foreground" />

        {/* 나머지 세그먼트 표시 */}
        {segments.map((segment, index) => {
          const path = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;

          return (
            <div key={segment} className="flex items-center">
              {index > 0 && (
                <ChevronRightIcon className="h-4 w-4 mx-2 text-muted-foreground" />
              )}
              {isLast ? (
                <span className="text-foreground font-medium">
                  {getBreadcrumbName(segment)}
                </span>
              ) : (
                <Link
                  href={path}
                  className="hover:text-primary transition-colors"
                >
                  {getBreadcrumbName(segment)}
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* blog 페이지일 때만 추가 설명 표시 */}
      {/* {pathname === "/blog" && (
        <div className="mt-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome to My Tech Blog
          </h1>
          <p className="mt-2 text-gray-600">
            프로그래밍, 프레임워크, 그리고 개발 경험을 기록하는 공간입니다.
          </p>
        </div>
      )} */}
    </div>
  );
}
