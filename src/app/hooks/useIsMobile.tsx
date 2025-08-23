import { useEffect, useState } from "react";

export default function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobile =
        /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(
          userAgent
        );
      setIsMobile(window.innerWidth <= breakpoint || mobile);
    };

    checkScreenSize(); // 초기 실행
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, [breakpoint]);

  return isMobile;
}
