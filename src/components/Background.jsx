import { useEffect, useState } from "react";

export default function Background() {
  const [position, setPosition] = useState({ x: 50, y: 20 });

  useEffect(() => {
    const handlePointerMove = (event) => {
      setPosition({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[#060810]" />
      <div className="background-grid absolute inset-0" />
      <div className="absolute -left-40 top-24 h-[34rem] w-[34rem] rounded-full bg-blue-600/10 blur-[150px]" />
      <div className="absolute -right-48 top-[38%] h-[38rem] w-[38rem] rounded-full bg-indigo-500/10 blur-[160px]" />
      <div
        className="absolute h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/[0.07] blur-[140px] transition-[left,top] duration-700"
        style={{ left: `${position.x}%`, top: `${position.y}%` }}
      />
      <div className="noise absolute inset-0 opacity-[0.035]" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-blue-500/[0.05] to-transparent" />
    </div>
  );
}
