import { useEffect } from "react";

// Event-driven accents: no extra permanent animation loop or per-frame React state.
export default function MotionDetails({ enabled }) {
  useEffect(() => {
    if (!enabled) return;
    const animations = new Set();
    const play = (element, frames, options) => {
      const animation = element.animate(frames, options);
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          const children = entry.target.querySelectorAll(
            ".section-head, .meta-row, .hero-tags > span, .toolbox-group p span, .repo-node, .now-card, .contact-bottom > a, .contact-bottom > button",
          );
          children.forEach((child, index) =>
            play(
              child,
              [
                { opacity: 0, transform: "translateY(14px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              {
                duration: 650,
                delay: Math.min(index * 45, 500),
                easing: "cubic-bezier(.16,1,.3,1)",
              },
            ),
          );
        }
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll("main > section")
      .forEach((section) => observer.observe(section));
    const click = (event) => {
      if (!event.target.closest("a, button") || !event.detail) return;
      const ripple = document.createElement("span");
      ripple.className = "click-ripple";
      ripple.setAttribute("aria-hidden", "true");
      ripple.style.left = `${event.clientX}px`;
      ripple.style.top = `${event.clientY}px`;
      document.body.append(ripple);
      const animation = ripple.animate(
        [
          { transform: "translate(-50%, -50%) scale(.2)", opacity: 0.65 },
          { transform: "translate(-50%, -50%) scale(2.5)", opacity: 0 },
        ],
        { duration: 650, easing: "ease-out" },
      );
      animations.add(animation);
      const remove = () => {
        ripple.remove();
        animations.delete(animation);
      };
      animation.onfinish = remove;
      animation.oncancel = remove;
    };
    const reactions = new WeakMap();
    const react = (event) => {
      const element = event.target.closest(
        ".now-card, .toolbox-group, .project-row, .repo-node, .hero-tags > span",
      );
      if (!element || element.contains(event.relatedTarget)) return;
      reactions.get(element)?.cancel();
      const animation = element.animate(
        [
          { translate: "0 0" },
          { translate: "0 -5px", offset: 0.45 },
          { translate: "0 0" },
        ],
        { duration: 550, easing: "cubic-bezier(.16,1,.3,1)" },
      );
      reactions.set(element, animation);
      animations.add(animation);
      animation.onfinish = animation.oncancel = () =>
        animations.delete(animation);
      const icon = element.querySelector(
        "h3 svg, .now-index svg, .folder-icon, .row-arrow",
      );
      if (icon)
        play(
          icon,
          [
            { rotate: "0deg", scale: 1 },
            { rotate: "-14deg", scale: 1.2 },
            { rotate: "8deg", scale: 1.1 },
            { rotate: "0deg", scale: 1 },
          ],
          { duration: 650, easing: "ease-out" },
        );
    };
    document.addEventListener("pointerover", react);
    document.addEventListener("focusin", react);
    const visibility = () => {
      for (const animation of animations) {
        if (document.hidden) animation.pause();
        else animation.play();
      }
    };
    document.addEventListener("click", click);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("pointerover", react);
      document.removeEventListener("focusin", react);
      document.removeEventListener("click", click);
      document.removeEventListener("visibilitychange", visibility);
      animations.forEach((animation) => animation.cancel());
      document
        .querySelectorAll(".click-ripple")
        .forEach((ripple) => ripple.remove());
    };
  }, [enabled]);
  return null;
}
