import { useEffect, useRef } from "react";

export default function Background() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow || window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    let frame;
    const handlePointerMove = (event) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        glow.style.transform = `translate3d(${event.clientX - glow.offsetWidth / 2}px, ${event.clientY - glow.offsetHeight / 2}px, 0)`;
      });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[#11111b]" />
      <div className="background-grid absolute inset-0" />
      <div className="absolute -left-40 top-24 h-[34rem] w-[34rem] rounded-full bg-[#89b4fa]/10 blur-[150px]" />
      <div className="absolute -right-48 top-[38%] h-[38rem] w-[38rem] rounded-full bg-[#cba6f7]/10 blur-[160px]" />
      <div
        ref={glowRef}
        className="pointer-glow absolute left-0 top-0 h-[34rem] w-[34rem] rounded-full bg-[#cba6f7]/[0.035] blur-[150px]"
      />
      <div className="noise absolute inset-0 opacity-[0.035]" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#cba6f7]/[0.06] to-transparent" />
    </div>
  );
}
