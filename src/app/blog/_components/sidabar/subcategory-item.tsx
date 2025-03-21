import Link from "next/link";

interface SubcategoryItemProps {
  subcategory: string;
  count: number;
}

export default function SubcategoryItem({
  subcategory,
  count,
}: SubcategoryItemProps) {
  return (
    <Link
      href={`/blog/${subcategory.toLowerCase()}`}
      className="flex items-center justify-between group py-1"
    >
      <span className="flex items-center text-gray-700 group-hover:text-blue-600">
        {subcategory}
      </span>
      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
        {count}
      </span>
    </Link>
  );
}
