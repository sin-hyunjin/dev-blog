"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import ThemeToggle from "./theme-toggle";
import Link from "next/link";

export default function NavHeader() {
  // 현재 스크롤 위치를 추적하기 위한 framer-motion의 useScroll 훅 사용
  const { scrollY } = useScroll();
  // 네비게이션 바의 숨김 상태를 관리하는 state
  const [hidden, setHidden] = useState(false);

  // 스크롤 이벤트가 발생할 때마다 실행되는 이벤트 핸들러
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    // 이전 스크롤 위치가 있고, 현재 스크롤이 이전보다 크며(아래로 스크롤),
    // 스크롤 위치가 150px을 넘었을 때 네비게이션 바를 숨김
    if (previous && latest > previous && latest > 150) {
      setHidden(true);
    } else {
      // 위로 스크롤하거나 150px 미만일 때는 네비게이션 바를 보여줌
      setHidden(false);
    }
  });

  return (
    <motion.header
      className="sticky top-0 w-full backdrop-blur-sm z-50 "
      // hidden 상태에 따라 y축으로 -100%(완전히 위로 숨김) 또는 0%(원래 위치) 이동
      animate={{ y: hidden ? "-100%" : "0%" }}
      // 애니메이션 지속 시간 0.3초, easeInOut 효과로 부드럽게 전환
      transition={{
        duration: hidden ? 0.2 : 0.8, // 숨길 때는 빠르게, 보여줄 때는 천천히
        ease: hidden ? "easeIn" : "easeOut", // 숨길 때와 보여줄 때 다른 이징 적용
      }}
    >
      <div className="p-6 flex justify-between max-w-7xl mx-auto">
        <Link href="/blog" className="text-xl font-bold">
          Dev Blog
        </Link>
        <ThemeToggle />
      </div>
    </motion.header>
  );
}
