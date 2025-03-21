import Breadcrumb from "@/app/blog/_components/main/breadcrumb";

export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 px-16 py-6  max-w-4xl overflow-y-auto">
      <Breadcrumb />
      {children}
    </main>
  );
}
