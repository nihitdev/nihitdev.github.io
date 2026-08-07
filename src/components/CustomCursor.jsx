import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR = "a, button, input, textarea, select, summary, [role='button'], [tabindex]:not([tabindex='-1'])";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    document.documentElement.classList.add("custom-cursor-enabled");
    let frame = 0;
    let x = 0;
    let y = 0;
    let visible = false;

    const render = () => {
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ring.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (!visible) {
        dot.style.opacity = "1";
        ring.style.opacity = "1";
        visible = true;
      }
      frame = 0;
    };

    const onPointerMove = (event) => {
      x = event.clientX;
      y = event.clientY;
      ring.classList.toggle("is-hovering", Boolean(event.target.closest?.(INTERACTIVE_SELECTOR)));
      if (reducedMotion.matches) render();
      else if (!frame) frame = requestAnimationFrame(render);
    };

    const onPointerOut = (event) => {
      if (!event.relatedTarget) {
        dot.style.opacity = "0";
        ring.style.opacity = "0";
        visible = false;
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerOut, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      document.documentElement.classList.remove("custom-cursor-enabled");
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerOut);
    };
  }, []);

  return (
    <div className="custom-cursor" aria-hidden="true">
      <span ref={ringRef} className="custom-cursor-ring" />
      <span ref={dotRef} className="custom-cursor-dot" />
    </div>
  );
}
