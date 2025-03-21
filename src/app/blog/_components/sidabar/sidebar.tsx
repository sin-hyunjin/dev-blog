"use client";

import { useEffect, useState } from "react";
import type { CategoryCount } from "@/types/post";
import CategorySection from "./category-section";

export default function Sidebar() {
  const [categories, setCategories] = useState<CategoryCount>({});

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
    <aside className="border-r border-gray-200 px-6 py-8 overflow-y-auto sticky top-24 h-[calc(100vh-6rem)] w-64 flex-shrink-0">
      {Object.entries(categories).map(([category, subcategories]) => (
        <CategorySection
          key={category}
          title={category}
          subcategories={subcategories}
        />
      ))}
    </aside>
  );
}
