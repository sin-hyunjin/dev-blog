// src/app/blog/_components/sidabar/sidebar.tsx
"use client";

import { useEffect, useState } from "react";
import CategorySection from "@/app/blog/_components/sidabar/category-section";
import { PostListItem } from "@/types/post";

interface EnhancedCategoryData {
  [category: string]: {
    [subcategory: string]: {
      count: number;
      posts: PostListItem[];
    };
  };
}

export default function Sidebar() {
  const [categories, setCategories] = useState<EnhancedCategoryData>({});

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }
    fetchCategories();
  }, []);

  return (
    <aside className="relative w-64 ">
      <div className="border-t border-dashed border-gray-200 sticky top-19 inset-0 after:absolute after:inset-0 after:border-l after:border-gray-200 after:border-dashed after:top-24 after:h-[calc(100%-6rem)]  flex-shrink-0 "></div>

      <div className="bg-custom-blue absolute inset-0 border-l border-bordergray border-dashed after:absolute after:inset-0 after:border-l after:border-bordergray after:border-dashed after:top-24 after:h-[calc(100%-6rem)]  flex-shrink-0 "></div>
      <div className="inset-0 px-6 py-8 overflow-y-auto sticky top-24 h-[calc(100vh-6rem)] ">
        {Object.entries(categories).map(([category, subcategories]) => (
          <CategorySection
            key={category}
            title={category}
            subcategories={subcategories}
          />
        ))}
      </div>
    </aside>
  );
}
