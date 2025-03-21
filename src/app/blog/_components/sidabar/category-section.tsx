import SubcategoryItem from "@/app/blog/_components/sidabar/subcategory-item";

interface CategorySectionProps {
  title: string;
  subcategories: {
    [key: string]: number;
  };
}

export default function CategorySection({
  title,
  subcategories,
}: CategorySectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xs font-semibold text-gray-400 uppercase mb-4">
        {title}
      </h2>
      <nav className="space-y-2">
        {Object.entries(subcategories).map(([subcategory, count]) => (
          <SubcategoryItem
            key={`${title}-${subcategory}`}
            subcategory={subcategory}
            count={count}
          />
        ))}
      </nav>
    </div>
  );
}
