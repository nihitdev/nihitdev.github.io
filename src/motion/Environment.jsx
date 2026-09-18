import { useEffect, useRef } from "react";
export default function Environment({ quality, reduced, burst }) {
  const canvas = useRef(null);
  const ring = useRef(null);
  const glow = useRef(null);
  useEffect(() => {
    if (reduced || quality === "low") return;
    const el = canvas.current;
    const ctx = el.getContext("2d");
    if (!ctx) return;
    const fine = matchMedia("(pointer: fine)").matches;
    let w = innerWidth,
      h = innerHeight,
      raf,
      last = 0,
      active = true;
    let x = w / 2,
      y = h / 2,
      rx = x,
      ry = y,
      seen = false,
      pressed = false,
      target = null,
      rect = null;
    const count = fine ? (quality === "ultra" ? 58 : 28) : 17;
    const points = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.2,
      vy: 0.12 + Math.random() * 0.2,
      size: Math.random() + 0.4,
    }));
    const resize = () => {
      w = innerWidth;
      h = innerHeight;
      const dpr = Math.min(devicePixelRatio, 1.5);
      el.width = w * dpr;
      el.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const resetTarget = () => {
      if (target) {
        target.style.setProperty("--rx", "0deg");
        target.style.setProperty("--ry", "0deg");
        target.style.setProperty("--mx", "0px");
        target.style.setProperty("--my", "0px");
      }
      target = null;
      rect = null;
    };
    const pointer = (e) => {
      x = e.clientX;
      y = e.clientY;
      seen = e.pointerType !== "touch";
    };
    const hover = (e) => {
      if (!fine) return;
      const next = e.target.closest("[data-tilt], [data-magnetic]");
      if (next !== target) {
        resetTarget();
        target = next;
        rect = next?.getBoundingClientRect();
      }
      const interactive = e.target.closest("a,button,input,.draggable");
      ring.current.dataset.mode = e.target.closest("[data-tilt]")
        ? "project"
        : e.target.closest("input,[data-command]")
          ? "terminal"
          : interactive
            ? "link"
            : "";
    };
    const down = () => {
      pressed = true;
    };
    const up = () => {
      pressed = false;
    };
    const leave = () => {
      seen = false;
      resetTarget();
    };
    const draw = (time) => {
      if (!active) return;
      raf = requestAnimationFrame(draw);
      const delta = Math.min((time - last) / 16.67 || 1, 2);
      last = time;
      ctx.clearRect(0, 0, w, h);
      points.forEach((p, i) => {
        p.x += p.vx * delta;
        p.y += p.vy * delta * (burst ? 6 : 1);
        const dx = p.x - x,
          dy = p.y - y,
          dist = Math.hypot(dx, dy);
        if (seen && dist < 120 && dist > 0) {
          p.x += (dx / dist) * 0.6;
          p.y += (dy / dist) * 0.6;
        }
        if (p.y > h + 10) p.y = -10;
        if (p.x > w + 10) p.x = -10;
        if (p.x < -10) p.x = w;
        ctx.fillStyle = burst
          ? "#a6e3a1"
          : i % 4 === 0
            ? "#df8fec88"
            : "#9a87cd65";
        if (burst) {
          ctx.font = "12px monospace";
          ctx.fillText(String.fromCharCode(0x30a0 + i), p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        if (quality === "ultra" && seen && dist < 170) {
          ctx.strokeStyle = "#b58cff18";
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
      });
      if (fine && seen) {
        const dx = x - rx,
          dy = y - ry;
        rx += dx * 0.16;
        ry += dy * 0.16;
        ring.current.style.opacity = "1";
        ring.current.style.transform = `translate3d(${rx - 18}px,${ry - 18}px,0) rotate(${Math.atan2(dy, dx)}rad) scale(${pressed ? 0.7 : 1 + Math.min(Math.hypot(dx, dy) / 180, 0.35)},${pressed ? 0.7 : 1})`;
        if (quality === "ultra")
          glow.current.style.transform = `translate3d(${rx - 220}px,${ry - 220}px,0)`;
        if (target && rect) {
          const px = (x - rect.left) / rect.width - 0.5,
            py = (y - rect.top) / rect.height - 0.5;
          target.style.setProperty("--rx", `${-py * 7}deg`);
          target.style.setProperty("--ry", `${px * 7}deg`);
          target.style.setProperty("--mx", `${px * 5}px`);
          target.style.setProperty("--my", `${py * 5}px`);
          target.style.setProperty("--spot-x", `${(px + 0.5) * 100}%`);
          target.style.setProperty("--spot-y", `${(py + 0.5) * 100}%`);
        }
      } else ring.current.style.opacity = "0";
    };
    const visibility = () => {
      active = !document.hidden;
      cancelAnimationFrame(raf);
      if (active) {
        last = 0;
        raf = requestAnimationFrame(draw);
      }
    };
    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", pointer, { passive: true });
    window.addEventListener("pointerover", hover, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("scroll", resetTarget, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      cancelAnimationFrame(raf);
      resetTarget();
      ctx.clearRect(0, 0, w, h);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", pointer);
      window.removeEventListener("pointerover", hover);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("scroll", resetTarget);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [quality, reduced, burst]);
  return (
    <>
      <div className="environment" aria-hidden="true">
        <div className="ambient-orb orb-a" />
        <div className="ambient-orb orb-b" />
        <div className="env-grid" />
        <canvas ref={canvas} />
        <div className="mouse-glow" ref={glow} />
      </div>
      <div className="crt-overlay" aria-hidden="true" />
      <div className="cursor-ring" ref={ring} aria-hidden="true">
        <span>&gt;_</span>
      </div>
    </>
  );
}
