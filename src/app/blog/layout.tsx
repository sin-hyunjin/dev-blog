import Sidebar from "@/app/blog/_components/sidabar/sidebar";
import MainContent from "@/app/blog/_components/main/main-content";
import TableOfContents from "@/app/blog/_components/table-of-contents";
import ScrollToTop from "@/components/scroll-to-top";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex justify-center min-h-screen text-gray-900 max-w-8xl mx-auto ">
      {/* 왼쪽 네비게이션 */}

      <ScrollToTop />

      <Sidebar />
      <div className=" flex-shrink-0 w-6 col-start-2 row-span-5 row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5  dark:[--pattern-fg:var(--color-white)]/10 "></div>
      {/* 메인 콘텐츠 영역 */}
      <MainContent>{children}</MainContent>

      {/* 오른쪽 목차 */}
      <TableOfContents />
    </div>
  );
}
