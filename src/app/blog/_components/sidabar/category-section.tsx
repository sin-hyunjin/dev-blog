import SubcategoryItem from "@/app/blog/_components/sidabar/subcategory-item";
import type { PostListItem } from "@/types/post";

interface CategorySectionProps {
  title: string;
  subcategories: {
    [key: string]: {
      count: number;
      posts: PostListItem[];
    };
  };
}

export default function CategorySection({
  title,
  subcategories,
}: CategorySectionProps) {
  return (
    <div className="mb-5 ">
      <h2 className="text-[11px] font-semibold text-gray-400 uppercase mb-2">
        {title}
      </h2>
      <nav className="space-y-2">
        {Object.entries(subcategories).map(([subcategory, data]) => (
          <SubcategoryItem
            key={`${title}-${subcategory}`}
            subcategory={subcategory}
            count={data.count}
            posts={data.posts}
          />
        ))}
      </nav>
    </div>
  );
}
