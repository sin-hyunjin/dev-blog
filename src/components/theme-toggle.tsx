"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Droplets, TreePine, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark" | "ocean" | "forest" | "system";

export function ThemeToggleColor() {
  const [theme, setTheme] = useState<Theme>("light");

  const applyTheme = (selectedTheme: Theme) => {
    let actualTheme = selectedTheme;

    if (selectedTheme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      actualTheme = prefersDark ? "dark" : "light";
    }

    document.documentElement.classList.remove(
      "light",
      "dark",
      "ocean",
      "forest"
    );
    document.documentElement.classList.add(actualTheme);
  };

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as Theme) || "light";
    setTheme(savedTheme);
    applyTheme(savedTheme);

    if (savedTheme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = () => applyTheme("system");
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }
  }, []);

  const toggleTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  // 테마별 색상 및 아이콘 설정
  const themeOptions = [
    {
      theme: "light",
      icon: <Sun className="h-4 w-4" />,
      color: "bg-amber-400 hover:bg-amber-500",
      label: "라이트 모드",
    },
    {
      theme: "dark",
      icon: <Moon className="h-4 w-4" />,
      color: "bg-indigo-700 hover:bg-indigo-800",
      label: "다크 모드",
    },
    {
      theme: "ocean",
      icon: <Droplets className="h-4 w-4" />,
      color: "bg-blue-500 hover:bg-blue-600",
      label: "오션 테마",
    },
    {
      theme: "forest",
      icon: <TreePine className="h-4 w-4" />,
      color: "bg-green-600 hover:bg-green-700",
      label: "포레스트 테마",
    },
    {
      theme: "system",
      icon: <Laptop className="h-4 w-4" />,
      color: "bg-gray-400 hover:bg-gray-500",
      label: "시스템 설정",
    },
  ];

  return (
    <div className="flex items-center gap-2">
      {themeOptions.map((option) => (
        <button
          key={option.theme}
          onClick={() => toggleTheme(option.theme as Theme)}
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center",
            "transition-all duration-300 text-white",
            "shadow-sm hover:shadow-md",
            option.color,
            theme === option.theme &&
              "ring-2 ring-offset-2 ring-primary scale-110"
          )}
          aria-label={option.label}
          title={option.label}
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
}
