"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const URL_NAME = {
  blog: { name: "blog", path: "/blog" },
  portfolio: "portfolio",
};

export default function NavHeader() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const isBlogActive = pathname.includes("/blog");
  const isPortfolioActive = pathname.includes("/portfolio");

  // 스크롤 이벤트는 중간 크기(md) 이상의 화면에서만 작동
  useMotionValueEvent(scrollY, "change", (latest) => {
    // 화면 너비가 md 이상인 경우에만 스크롤에 따라 헤더 숨김
    if (window.innerWidth >= 768) {
      const previous = scrollY.getPrevious();
      if (previous && latest > previous && latest > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    } else {
      // 작은 화면에서는 항상 보이게 설정
      setHidden(false);
    }
  });

  // 화면 크기 변경 감지를 위한 이벤트 리스너
  useEffect(() => {
    const handleResize = () => {
      // 작은 화면에서는 항상 헤더가 보이도록 설정
      if (window.innerWidth < 768) {
        setHidden(false);
      }
    };

    // 초기 로드 및 리사이즈 시 적용
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.header
      className="sticky top-0 w-full z-50"
      // 작은 화면에서는 애니메이션 없이 항상 보이도록 조건부 애니메이션 적용
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{
        duration: hidden ? 0.2 : 0.8,
        ease: hidden ? "easeIn" : "easeOut",
      }}
    >
      {/* 배경과 보더 컨테이너 - 전체 너비로 확장 */}
      <div className="w-full border-b border-dashed border-border-dashed backdrop-blur-xs">
        {/* 내부 컨텐츠 컨테이너 - 최대 너비 제한 */}
        <div className="max-w-88rem mx-auto border-x border-dashed border-border-dashed px-4 md:px-7 py-3">
          <div className="flex justify-between w-full items-center">
            <div className="flex items-center space-x-4 md:space-x-6">
              <Link
                href="/blog"
                className={cn(
                  "relative transition-colors duration-300 group rounded-md hover:text-foreground",
                  isBlogActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                <span
                  className={cn(
                    "text-xs inline-block uppercase px-2 py-1 rounded-md font-semibold transition-colors duration-300 group-hover:bg-muted",
                    isBlogActive
                      ? "bg-muted-foreground text-background"
                      : "bg-transparent"
                  )}
                >
                  blog
                </span>
              </Link>

              <Link
                href="#"
                className={cn(
                  "relative transition-all duration-300 group",
                  isPortfolioActive
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "text-xs inline-block uppercase px-2 py-1 rounded-md font-semibold transition-colors duration-300",
                    isPortfolioActive
                      ? "bg-muted-foreground text-background"
                      : "bg-transparent group-hover:bg-muted/50"
                  )}
                >
                  portfolio
                </span>
              </Link>
            </div>

            {/* 모바일에서 ThemeToggle 크기 조정 */}
            <div className="shrink-0">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
