import { Component, useEffect, useRef, useState } from "react";

export function ArchLogo({ className = "", ...props }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M50 5 8 94l25-15c-2-15 4-27 17-27s19 12 17 27l25 15-13-28-13-7 10 2L50 5Z" />
    </svg>
  );
}
export function WindowBar({
  title,
  detail = "zsh",
  draggable = false,
  ...props
}) {
  return (
    <div className={`window-bar ${draggable ? "draggable" : ""}`} {...props}>
      <span className="window-dots" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span>{title}</span>
      <span className="window-detail">{detail}</span>
    </div>
  );
}
export function TerminalText({ text, delay = 0, active = true }) {
  const [length, setLength] = useState(0);
  useEffect(() => {
    if (!active || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer;
    let index = 0;
    const step = () => {
      index++;
      setLength(index);
      if (index < text.length)
        timer = setTimeout(step, 25 + Math.random() * 65);
    };
    timer = setTimeout(step, delay);
    return () => clearTimeout(timer);
  }, [text, delay, active]);
  return (
    <span className="terminal-text">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="typed-motion">
        {text.slice(0, length)}
      </span>
      <span className="typed-static" aria-hidden="true">
        {text}
      </span>
      <span className="block-cursor" aria-hidden="true">
        ▌
      </span>
    </span>
  );
}
export function Reveal({ children, className = "", style }) {
  return (
    <div className={`reveal ${className}`} style={style}>
      {children}
    </div>
  );
}
export function TiltCard({ children, className = "", ...props }) {
  return (
    <article className={`tilt-card reveal ${className}`} data-tilt {...props}>
      {children}
    </article>
  );
}
export function MagneticButton({ children, className = "", href, ...props }) {
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      className={`button magnetic ${className}`}
      data-magnetic
      {...props}
    >
      {children}
    </Tag>
  );
}
export function DraggableWindow({ children, title }) {
  const ref = useRef(null);
  const drag = useRef(null);
  return (
    <div className="floating-window" ref={ref}>
      <WindowBar
        title={title}
        draggable
        onPointerDown={(e) => {
          if (!matchMedia("(pointer: fine)").matches || e.button !== 0) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          drag.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          ref.current.style.transform = `translate(${Math.max(-65, Math.min(65, e.clientX - drag.current.x))}px,${Math.max(-55, Math.min(55, e.clientY - drag.current.y))}px)`;
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      />
      {children}
    </div>
  );
}

export function GlitchText({ children, className = "" }) {
  return (
    <span
      className={`glitch-text ${className}`}
      data-text={typeof children === "string" ? children : undefined}
    >
      {children}
    </span>
  );
}
export function CircuitDivider() {
  return (
    <svg
      className="circuit-divider"
      viewBox="0 0 1000 20"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M0 10 H330 L340 2 H390 L400 10 H710 L720 18 H755 L765 10 H1000" />
      <circle cx="400" cy="10" r="2" />
      <circle cx="765" cy="10" r="2" />
    </svg>
  );
}

// Ambient enhancements must never take the portfolio down if their chunk fails.
export class EffectBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
