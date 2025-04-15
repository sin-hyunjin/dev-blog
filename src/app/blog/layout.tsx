import Sidebar from "@/app/blog/_components/sidabar/sidebar";
import MainContent from "@/app/blog/_components/main/main-content";
import TableOfContents from "@/app/blog/_components/table-of-contents";
import ScrollToTop from "@/components/scroll-to-top";
import { Menu } from "lucide-react";

import { ThemeToggle } from "@/components/ThemeToggle";
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen max-w-88rem mx-auto border-x border-dashed border-border-dashed  ">
      <ScrollToTop />
      {/* 사이드바 */}

      <Sidebar />

      {/* 패턴 디자인 - 데스크톱에서만 표시 */}
      <div className="hidden md:block flex-shrink-0 w-6 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10" />

      {/* 메인 콘텐츠 영역 */}
      {/* <div className="flex-1 min-w-0"> */}
      {/* min-w-0 추가로 flex 아이템이 너무 커지는 것 방지 */}
      <MainContent>{children}</MainContent>
      {/* </div> */}

      {/* 오른쪽 목차 */}
      {/* flex-shrink-0 추가 */}
      <TableOfContents />
      {/* 모바일 네비게이션 버튼 */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 lg:hidden z-50">
        <button className="p-3 bg-background rounded-full shadow-lg">
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
