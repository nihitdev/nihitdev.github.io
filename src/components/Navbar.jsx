import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "../data/portfolio";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  return (
    <header className="nav-wrap">
      <nav className="nav shell">
        <a className="brand" href="#home"><span>╰─❯</span> nihitdev</a>
        <button className="menu-button" onClick={() => setOpen((v) => !v)} aria-label="Toggle navigation">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className={`nav-links ${open ? "open" : ""}`}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </div>
      </nav>
    </header>
  );
}
