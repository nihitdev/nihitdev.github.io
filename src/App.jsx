import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Toolbox from "./components/Toolbox";
import Projects from "./components/Projects";
import Now from "./components/Now";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
export default function App() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.04 },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((section) => observer.observe(section));
    const root = document.documentElement;
    const hero = document.querySelector(".hero-visual");
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      root.style.setProperty(
        "--scroll-progress",
        `${max ? (window.scrollY / max) * 100 : 0}%`,
      );
    };
    const onPointer = (event) => {
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty(
        "--mouse-x",
        `${((event.clientX - rect.left) / rect.width - 0.5) * 2}`,
      );
      hero.style.setProperty(
        "--mouse-y",
        `${((event.clientY - rect.top) / rect.height - 0.5) * 2}`,
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    onScroll();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Toolbox />
        <Projects />
        <Now />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
