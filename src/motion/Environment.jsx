import { useEffect, useRef } from "react";

export default function Environment({ quality, reduced, burst }) {
  const canvas = useRef(null);
  const sparks = useRef(null);
  const ring = useRef(null);
  const dot = useRef(null);
  const glow = useRef(null);
  useEffect(() => {
    if (reduced || quality === "low") return;
    const cursorRing = ring.current;
    const cursorDot = dot.current;
    const ctx = canvas.current.getContext("2d");
    const fx = sparks.current.getContext("2d");
    if (!ctx || !fx) return;
    const root = document.documentElement;
    const fine = matchMedia("(pointer: fine)");
    let w = innerWidth,
      h = innerHeight,
      raf,
      last = 0;
    let x = w / 2,
      y = h / 2,
      rx = x,
      ry = y;
    let seen = false,
      pressed = false,
      target = null,
      rect = null;
    let modal = false,
      nativeControl = false;
    let trail = [],
      fragments = [],
      meteors = [],
      nextMeteor = 0;
    const points = Array.from(
      { length: fine.matches ? (quality === "ultra" ? 96 : 40) : 24 },
      () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: 0.15 + Math.random() * 0.25,
        size: Math.random() * 1.5 + 0.4,
        phase: Math.random() * Math.PI * 2,
      }),
    );
    const resize = () => {
      w = innerWidth;
      h = innerHeight;
      const dpr = Math.min(devicePixelRatio, 1.5);
      for (const [element, context] of [
        [canvas.current, ctx],
        [sparks.current, fx],
      ]) {
        element.width = w * dpr;
        element.height = h * dpr;
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };
    const resetTarget = () => {
      if (target)
        for (const [key, value] of [
          ["--rx", "0deg"],
          ["--ry", "0deg"],
          ["--mx", "0px"],
          ["--my", "0px"],
        ])
          target.style.setProperty(key, value);
      target = null;
      rect = null;
    };
    const syncCursor = () => {
      const visible =
        fine.matches && seen && !modal && !nativeControl && !document.hidden;
      root.toggleAttribute("data-custom-cursor", visible);
      cursorRing.style.opacity = visible ? "1" : "0";
      cursorDot.style.opacity = visible ? "1" : "0";
      return visible;
    };
    const observeModal = new MutationObserver(() => {
      modal = !!document.querySelector("dialog[open]");
      syncCursor();
    });
    observeModal.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ["open"],
    });
    modal = !!document.querySelector("dialog[open]");
    const pointer = (event) => {
      x = event.clientX;
      y = event.clientY;
      if (!seen) {
        rx = x;
        ry = y;
      }
      seen = event.pointerType !== "touch";
      nativeControl = !!event.target.closest("select");
      if (syncCursor()) {
        cursorDot.style.transform = `translate3d(${x}px,${y}px,0)`;
        trail.push({ x, y, life: 1 });
        trail = trail.slice(-32);
      }
    };
    const hover = (event) => {
      if (!fine.matches) return;
      const next = event.target.closest("[data-tilt], [data-magnetic]");
      if (next !== target) {
        resetTarget();
        target = next;
        rect = next?.getBoundingClientRect();
      }
      const mode = event.target.closest("input,textarea,[data-command]")
        ? "terminal"
        : event.target.closest(".draggable")
          ? "drag"
          : event.target.closest(".project-preview-button")
            ? "project"
            : event.target.closest("a,button")
              ? "link"
              : "idle";
      cursorRing.dataset.mode = mode;
      cursorRing.querySelector("span").textContent = {
        terminal: "TYPE",
        drag: "DRAG",
        project: "INSPECT",
        link: "OPEN",
        idle: "",
      }[mode];
    };
    const down = (event) => {
      pressed = true;
      cursorRing.dataset.pressed = "true";
      if (modal || event.pointerType === "touch" || !fine.matches) return;
      for (let i = 0; i < (quality === "ultra" ? 26 : 12); i++) {
        const angle = Math.random() * Math.PI * 2,
          speed = 1.5 + Math.random() * 4;
        fragments.push({
          x: event.clientX,
          y: event.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          size: 1 + Math.random() * 2,
        });
      }
      fragments = fragments.slice(-130);
    };
    const up = () => {
      pressed = false;
      cursorRing.dataset.pressed = "false";
    };
    const leave = () => {
      seen = false;
      up();
      resetTarget();
      syncCursor();
      trail = [];
    };
    const draw = (time) => {
      raf = requestAnimationFrame(draw);
      const delta = Math.min((time - last) / 16.67 || 1, 2);
      last = time;
      ctx.clearRect(0, 0, w, h);
      fx.clearRect(0, 0, w, h);
      points.forEach((p, i) => {
        p.x += p.vx * delta;
        p.y += p.vy * delta * (burst ? 7 : 1);
        const dx = p.x - x,
          dy = p.y - y,
          dist = Math.hypot(dx, dy);
        if (seen && dist < 130 && dist > 0) {
          p.x += (dx / dist) * 0.6;
          p.y += (dy / dist) * 0.6;
        }
        if (p.y > h + 10) p.y = -10;
        if (p.x > w + 10) p.x = -10;
        if (p.x < -10) p.x = w;
        ctx.globalAlpha = 0.35 + (Math.sin(time * 0.0015 + p.phase) + 1) * 0.25;
        ctx.fillStyle = burst ? "#a6e3a1" : i % 4 === 0 ? "#df8fec" : "#9a87cd";
        if (burst) {
          ctx.font = "12px monospace";
          ctx.fillText(String.fromCharCode(0x30a0 + i), p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        if (quality === "ultra") {
          // A sparse constellation, not a full quadratic particle mesh.
          const neighbor = points[(i + 1) % points.length];
          if (Math.hypot(p.x - neighbor.x, p.y - neighbor.y) < 180) {
            ctx.strokeStyle = "#b58cff24";
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(neighbor.x, neighbor.y);
            ctx.stroke();
          }
          if (seen && dist < 180) {
            ctx.strokeStyle = "#b58cff20";
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        }
      });
      ctx.globalAlpha = 1;
      if (time > nextMeteor && quality === "ultra") {
        meteors.push({ x: Math.random() * w, y: -40, life: 1 });
        nextMeteor = time + 1800 + Math.random() * 2000;
      }
      meteors = meteors.filter((meteor) => meteor.life > 0);
      for (const meteor of meteors) {
        meteor.x -= 5 * delta;
        meteor.y += 3 * delta;
        meteor.life -= 0.007 * delta;
        const gradient = ctx.createLinearGradient(
          meteor.x,
          meteor.y,
          meteor.x + 100,
          meteor.y - 60,
        );
        gradient.addColorStop(0, `rgba(203,166,247,${meteor.life * 0.6})`);
        gradient.addColorStop(1, "transparent");
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(meteor.x + 100, meteor.y - 60);
        ctx.stroke();
      }
      const visible = syncCursor();
      if (visible) {
        rx += (x - rx) * 0.2;
        ry += (y - ry) * 0.2;
        cursorRing.style.transform = `translate3d(${rx - 22}px,${ry - 22}px,0) scale(${pressed ? 0.7 : 1})`;
        glow.current.style.transform = `translate3d(${rx - 220}px,${ry - 220}px,0)`;
        if (target && rect) {
          const px = Math.max(
            -0.5,
            Math.min(0.5, (x - rect.left) / rect.width - 0.5),
          );
          const py = Math.max(
            -0.5,
            Math.min(0.5, (y - rect.top) / rect.height - 0.5),
          );
          for (const [key, value] of [
            ["--rx", `${-py * 10}deg`],
            ["--ry", `${px * 10}deg`],
            ["--mx", `${px * 9}px`],
            ["--my", `${py * 9}px`],
            ["--spot-x", `${(px + 0.5) * 100}%`],
            ["--spot-y", `${(py + 0.5) * 100}%`],
          ])
            target.style.setProperty(key, value);
        }
      }
      trail = trail.filter((p) => (p.life -= 0.045 * delta) > 0);
      if (visible)
        trail.forEach((p, i) => {
          fx.fillStyle = `rgba(203,166,247,${p.life * 0.45})`;
          fx.beginPath();
          fx.arc(p.x, p.y, p.life * 3, 0, Math.PI * 2);
          fx.fill();
          if (i) {
            fx.strokeStyle = `rgba(203,166,247,${p.life * 0.3})`;
            fx.beginPath();
            fx.moveTo(trail[i - 1].x, trail[i - 1].y);
            fx.lineTo(p.x, p.y);
            fx.stroke();
          }
        });
      fragments = fragments.filter((p) => p.life > 0);
      for (const p of fragments) {
        p.x += p.vx * delta;
        p.y += p.vy * delta;
        p.vy += 0.035 * delta;
        p.life -= 0.025 * delta;
        fx.fillStyle = `rgba(245,194,231,${Math.max(0, p.life)})`;
        fx.fillRect(p.x, p.y, p.size, p.size);
      }
    };
    const visibility = () => {
      cancelAnimationFrame(raf);
      syncCursor();
      if (!document.hidden) {
        last = 0;
        raf = requestAnimationFrame(draw);
      }
    };
    resize();
    if (!document.hidden) raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", pointer, { passive: true });
    window.addEventListener("pointerover", hover, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", leave);
    window.addEventListener("blur", leave);
    window.addEventListener("scroll", resetTarget, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("visibilitychange", visibility);
    fine.addEventListener("change", leave);
    return () => {
      cancelAnimationFrame(raf);
      observeModal.disconnect();
      resetTarget();
      root.removeAttribute("data-custom-cursor");
      cursorRing.style.opacity = "0";
      cursorDot.style.opacity = "0";
      ctx.clearRect(0, 0, w, h);
      fx.clearRect(0, 0, w, h);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", pointer);
      window.removeEventListener("pointerover", hover);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", leave);
      window.removeEventListener("blur", leave);
      window.removeEventListener("scroll", resetTarget);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("visibilitychange", visibility);
      fine.removeEventListener("change", leave);
    };
  }, [quality, reduced, burst]);
  return (
    <>
      <div className="environment" aria-hidden="true">
        <div className="ambient-orb orb-a" />
        <div className="ambient-orb orb-b" />
        <div className="env-grid" />
        <div className="signal-lanes">
          {Array.from({ length: 7 }, (_, i) => (
            <i key={i} style={{ "--i": i }} />
          ))}
        </div>
        <canvas ref={canvas} />
        <div className="mouse-glow" ref={glow} />
      </div>
      <div className="crt-overlay" aria-hidden="true" />
      <canvas className="cursor-sparks" ref={sparks} aria-hidden="true" />
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
      <div className="cursor-ring" ref={ring} aria-hidden="true">
        <i className="cursor-orbit" />
        <span />
      </div>
    </>
  );
}
