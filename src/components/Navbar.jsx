import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navItems } from "../data/portfolio";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuButton = useRef(null);
  const header = useRef(null);
  useEffect(() => {
    const update = () => {
      let id = "";
      for (const section of document.querySelectorAll("main > section")) {
        if (section.getBoundingClientRect().top <= 160) id = "#" + section.id;
      }
      setActive(id);
    };
    const close = (e) => {
      if (
        e.key === "Escape" &&
        menuButton.current?.getAttribute("aria-expanded") === "true"
      ) {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const outside = (e) => {
      if (!header.current?.contains(e.target)) setOpen(false);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);
  return (
    <header className="nav-wrap" ref={header}>
      <nav className="nav shell" aria-label="Main navigation">
        <a
          className="brand"
          href="#home"
          onClick={() => setOpen(false)}
          aria-label="nihitdev home"
        >
          <span>
            n<span className="accent">.</span>
          </span>
          <span>
            nihitdev<span className="brand-slash"> / </span>
          </span>
        </a>
        <button
          ref={menuButton}
          className="menu-button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div
          id="navigation"
          className={`nav-links ${open ? "open" : ""}`}
          onBlur={(e) => {
            if (
              !e.currentTarget.contains(e.relatedTarget) &&
              e.relatedTarget !== menuButton.current
            )
              setOpen(false);
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.href ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
              {item.href === "#contact" && <ArrowUpRight size={13} />}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
