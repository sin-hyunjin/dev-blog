import Sidebar from "@/app/blog/_components/sidabar/sidebar";
import MainContent from "@/app/blog/_components/main/main-content";
import TableOfContents from "@/app/blog/_components/table-of-contents";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen text-gray-900 max-w-7xl mx-auto">
      {/* 왼쪽 네비게이션 */}

      <Sidebar />

      {/* 메인 콘텐츠 영역 */}
      <MainContent>{children}</MainContent>

      {/* 오른쪽 목차 */}
      <TableOfContents />
    </div>
  );
}
