import { useEffect } from "react";

export function useLockScroll(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const container = ref.current ?? document.body;

    if (!container) return;

    // `data-allow-background-scroll` 속성을 확인
    const allowScroll = container.dataset.allowBackgroundScroll === "true";

    if (!allowScroll) {
      // 스크롤을 막는 CSS 클래스 추가
      container.classList.add("no-container-scroll");

      // 스크롤 이벤트 막기
      const preventScroll = (e: Event) => {
        e.preventDefault();
      };
      container.addEventListener("wheel", preventScroll, { passive: false });
      container.addEventListener("touchmove", preventScroll, {
        passive: false,
      });

      // 클린업
      return () => {
        container.classList.remove("no-container-scroll");
        container.removeEventListener("wheel", preventScroll);
        container.removeEventListener("touchmove", preventScroll);
      };
    }
  }, [ref]);
}
