import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import GitHubMark from "./GitHubMark";
import { navItems } from "../data/portfolio";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min((window.scrollY / height) * 100, 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", ...navItems.map((item) => item.href.slice(1))]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-24% 0px -62%", threshold: [0, 0.2, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[#45475a]/50 bg-[#181825]/85 shadow-2xl shadow-[#11111b]/40 backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="scroll-progress" style={{ transform: `scaleX(${progress / 100})` }} aria-hidden="true" />
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="group flex items-center gap-3" aria-label="Nihit Sunhare home">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-[#cba6f7]/30 bg-[#cba6f7]/10 font-mono text-sm font-bold text-[#cba6f7] transition group-hover:border-[#cba6f7]/60 group-hover:bg-[#cba6f7]/20">
            N/
          </span>
          <span className="text-sm font-black tracking-[0.16em] text-white sm:text-base">
            NIHIT<span className="text-[#cba6f7]">.</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.href ? "location" : undefined}
              className={`nav-link ${active === item.href ? "is-active" : ""}`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://github.com/nihitdev"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#cba6f7]/30 bg-[#313244]/55 px-4 py-2.5 text-sm font-semibold text-[#cdd6f4] transition hover:-translate-y-0.5 hover:border-[#cba6f7]/60 hover:bg-[#45475a]/65"
          >
            <GitHubMark size={17} /> GitHub
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-xl border border-[#45475a] bg-[#313244]/70 text-[#cdd6f4] md:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            className="mx-4 mb-4 overflow-hidden rounded-2xl border border-[#45475a] bg-[#181825]/95 p-3 shadow-2xl shadow-[#11111b]/50 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-semibold text-[#cdd6f4] transition hover:bg-[#313244] hover:text-[#b4befe]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://github.com/nihitdev"
              target="_blank"
              rel="noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-[#cba6f7]/50 bg-[#313244] px-4 py-3 text-sm font-bold text-[#cdd6f4]"
            >
              <GitHubMark size={17} /> View GitHub
            </a>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
