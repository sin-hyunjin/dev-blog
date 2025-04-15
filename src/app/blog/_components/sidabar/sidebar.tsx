// src/app/blog/_components/sidabar/sidebar.tsx
"use client";

import { useEffect, useState } from "react";
import CategorySection from "@/app/blog/_components/sidabar/category-section";
import { PostListItem } from "@/types/post";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
    <motion.aside
      className={cn(
        "hidden w-64 sticky top-20",
        "h-[calc(100vh-6rem)]",
        "md:block",
        "bg-background/80 backdrop-blur-sm",
        "rounded-md  border-dashed border-border-dashed",
        "shadow-lg"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-muted-foreground/5 to-transparent rounded-lg" />

      <motion.div
        className={cn(
          "relative",
          "h-full w-full",
          "px-6 py-8",
          "overflow-y-auto",
          "scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent",
          "hover:scrollbar-thumb-border-hover",
          "transition-all duration-300"
        )}
      >
        <div className="space-y-6">
          {Object.entries(categories).map(
            ([category, subcategories], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CategorySection
                  title={category}
                  subcategories={subcategories}
                />
              </motion.div>
            )
          )}
        </div>
      </motion.div>
    </motion.aside>
  );
}
