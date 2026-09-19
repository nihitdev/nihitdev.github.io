import { useEffect, useRef, useState } from "react";
import { Menu, X, Wifi } from "lucide-react";
import { ArchLogo } from "../motion/Primitives";
import { workspaces } from "../data/portfolio";
const items = workspaces
  .filter((item) => item.label)
  .map(({ id, label }) => [id, label]);
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const header = useRef(null);
  const menu = useRef(null);
  const links = useRef(null);
  const highlight = useRef(null);
  useEffect(() => {
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        let current = "home";
        for (const [id] of items) {
          if (document.getElementById(id)?.getBoundingClientRect().top <= 200)
            current = id;
        }
        setActive(current);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const close = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        if (menu.current?.getAttribute("aria-expanded") === "true")
          menu.current.focus();
      }
    };
    const outside = (e) => {
      if (!header.current?.contains(e.target)) setOpen(false);
    };
    window.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);
  useEffect(() => {
    const position = () => {
      const el = links.current?.querySelector("[aria-current]");
      if (el) {
        highlight.current.style.width = `${el.offsetWidth}px`;
        highlight.current.style.transform = `translateX(${el.offsetLeft}px)`;
      }
    };
    position();
    window.addEventListener("resize", position);
    return () => window.removeEventListener("resize", position);
  }, [active, open]);
  return (
    <header className="nav-wrap" ref={header}>
      <nav className="nav shell" aria-label="Workspace navigation">
        <a
          className="brand"
          href="#home"
          aria-label="ArchNemesis home"
          onClick={() => setOpen(false)}
        >
          <ArchLogo />
          <span>
            Arch<span className="accent">Nemesis</span>
            <small>NIHIT'S PERSONAL ENVIRONMENT</small>
          </span>
        </a>
        <button
          ref={menu}
          className="menu-button"
          aria-controls="navigation"
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <div
          id="navigation"
          ref={links}
          className={`nav-links ${open ? "open" : ""}`}
          onBlur={(e) => {
            if (
              !e.currentTarget.contains(e.relatedTarget) &&
              e.relatedTarget !== menu.current
            )
              setOpen(false);
          }}
        >
          <span
            ref={highlight}
            className="workspace-highlight"
            aria-hidden="true"
          />
          {items.map(([id, label], i) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              onClick={() => {
                setActive(id);
                setOpen(false);
              }}
            >
              <span>{i + 1}</span>
              {label}
            </a>
          ))}
        </div>
        <span className="nav-online">
          <Wifi size={13} />
          <i className="status-dot" /> online
        </span>
      </nav>
    </header>
  );
}
