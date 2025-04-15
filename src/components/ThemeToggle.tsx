"use client";

import { useEffect, useState, useRef } from "react";
import {
  Moon,
  Sun,
  Droplets,
  TreePine,
  Laptop,
  Code,
  Palette,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type Theme = "light" | "dark" | "ocean" | "forest" | "system";

interface ThemeOption {
  theme: Theme;
  icon: JSX.Element;
  activeIcon: JSX.Element;
  color: string;
  bgColor: string;
  label: string;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  //
  const themeOptions: ThemeOption[] = [
    {
      theme: "light",
      icon: <Sun className="h-4 w-4" />,
      activeIcon: <Sun className="h-4 w-4" />,
      color: "text-amber-900",
      bgColor: "bg-gradient-to-br from-amber-300 to-amber-400",
      label: "Light",
    },
    {
      theme: "dark",
      icon: <Moon className="h-4 w-4" />,
      activeIcon: <Moon className="h-4 w-4" />,
      color: "text-indigo-100",
      bgColor: "bg-gradient-to-br from-indigo-700 to-indigo-900",
      label: "Dark",
    },
    {
      theme: "ocean",
      icon: <Droplets className="h-4 w-4" />,
      activeIcon: <Droplets className="h-4 w-4" />,
      color: "text-blue-100",
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-700",
      label: "Ocean",
    },
    {
      theme: "forest",
      icon: <TreePine className="h-4 w-4" />,
      activeIcon: <TreePine className="h-4 w-4" />,
      color: "text-green-100",
      bgColor: "bg-gradient-to-br from-green-600 to-green-800",
      label: "Forest",
    },
    {
      theme: "system",
      icon: <Laptop className="h-4 w-4" />,
      activeIcon: <Laptop className="h-4 w-4" />,
      color: "text-gray-100",
      bgColor: "bg-gradient-to-br from-gray-600 to-gray-800",
      label: "System",
    },
  ];

  // 현재 선택된 테마 옵션 찾기
  const getCurrentThemeOption = () => {
    return (
      themeOptions.find((option) => option.theme === theme) || themeOptions[0]
    );
  };

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

  // 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
    setIsOpen(false);
  };

  const currentTheme = getCurrentThemeOption();

  return (
    <div className="relative" ref={menuRef}>
      {/* 현재 테마 버튼 - 코드 블록 형태 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-1.5 py-1.5 px-2.5 rounded-md",
          "font-mono text-xs font-medium",
          "border border-border-dashed shadow-sm",
          "transition-all duration-200 ease-in-out",
          "hover:shadow-md hover:border-border-hover"
        )}
        aria-label={`테마 설정 (현재: ${currentTheme.label})`}
      >
        <div
          className={cn(
            "w-5 h-5 rounded-sm flex items-center justify-center",
            currentTheme.bgColor,
            "text-white"
          )}
        >
          {currentTheme.activeIcon}
        </div>

        <Code
          className={cn("hidden h-3.5 w-3.5 text-muted-foreground", "md:block")}
        />
        <span className={cn("hidden font-mono", "md:block")}>
          {currentTheme.label}
        </span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground ml-0.5" />
      </button>

      {/* 플로팅 메뉴 - 코드 에디터 스타일 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "absolute right-0 mt-1 w-44 z-50",
              "rounded-md shadow-lg ring-border-dashed ring-opacity-5 overflow-hidden",
              "bg-popover border border-border-dashed",
              "backdrop-blur-md"
            )}
          >
            <div className="p-1 space-y-0.5">
              {themeOptions.map((option) => (
                <button
                  key={option.theme}
                  onClick={() => toggleTheme(option.theme)}
                  className={cn(
                    "flex items-center w-full gap-2 px-2 py-1.5 rounded-sm",
                    "transition-colors duration-150 text-sm",
                    "hover:bg-muted",
                    option.theme === theme ? "bg-muted" : ""
                  )}
                >
                  <div
                    className={cn(
                      "w-6 h-6 rounded-sm flex items-center justify-center",
                      option.bgColor,
                      "text-white"
                    )}
                  >
                    {option.icon}
                  </div>
                  <span className="text-foreground">{option.label}</span>

                  {/* 선택된 테마 표시 */}
                  {option.theme === theme && (
                    <div className="ml-auto flex-shrink-0 flex items-center justify-center w-4 h-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* 하단 설명 */}
            <div className="p-1 border-t border-border-dashed">
              <div className="px-2 py-1 text-[10px] text-muted-foreground flex items-center">
                <Palette className="w-3 h-3 mr-1" />
                <span>테마에 따라 문법 강조도 변경됩니다</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
