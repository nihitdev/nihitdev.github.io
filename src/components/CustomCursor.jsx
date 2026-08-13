import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "summary",
  "[role='button']",
  "[tabindex]:not([tabindex='-1'])",
  ".project-card",
].join(",");

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 651px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId;
    let active = false;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const draw = () => {
      const amount = reducedMotion.matches ? 1 : 0.22;
      currentX += (targetX - currentX) * amount;
      currentY += (targetY - currentY) * amount;
      cursor.style.left = `${currentX}px`;
      cursor.style.top = `${currentY}px`;
      frameId = window.requestAnimationFrame(draw);
    };

    const deactivate = () => {
      active = false;
      document.documentElement.classList.remove("custom-cursor-active");
      cursor.classList.remove("is-visible", "is-hovering", "is-clicking");
      cursor.textContent = "λ";
      window.cancelAnimationFrame(frameId);
    };

    const handleMove = (event) => {
      if (!finePointer.matches || event.pointerType !== "mouse") {
        deactivate();
        return;
      }

      targetX = event.clientX;
      targetY = event.clientY;

      if (!active) {
        active = true;
        currentX = targetX;
        currentY = targetY;
        document.documentElement.classList.add("custom-cursor-active");
        cursor.classList.add("is-visible");
        frameId = window.requestAnimationFrame(draw);
      }

      const hovering = Boolean(event.target.closest?.(INTERACTIVE_SELECTOR));
      cursor.classList.toggle("is-hovering", hovering);
      cursor.textContent = hovering ? "❯" : "λ";
    };

    const handleDown = (event) => {
      if (active && event.pointerType === "mouse") cursor.classList.add("is-clicking");
    };
    const handleUp = () => cursor.classList.remove("is-clicking");
    const handleLeave = () => cursor.classList.remove("is-visible", "is-clicking");
    const handleEnter = (event) => {
      if (active && event.pointerType === "mouse") cursor.classList.add("is-visible");
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("blur", handleUp);
    document.documentElement.addEventListener("pointerleave", handleLeave);
    document.documentElement.addEventListener("pointerenter", handleEnter);
    finePointer.addEventListener("change", deactivate);

    return () => {
      deactivate();
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("blur", handleUp);
      document.documentElement.removeEventListener("pointerleave", handleLeave);
      document.documentElement.removeEventListener("pointerenter", handleEnter);
      finePointer.removeEventListener("change", deactivate);
    };
  }, []);

  return <span ref={cursorRef} className="custom-cursor" aria-hidden="true">λ</span>;
}
