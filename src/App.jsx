import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import MotionDetails from "./motion/MotionDetails";
import Navbar from "./components/Navbar";
import CommandPalette from "./components/CommandPalette";
import Hero from "./components/Hero";
import About from "./components/About";
import Toolbox from "./components/Toolbox";
import Projects from "./components/Projects";
import Now from "./components/Now";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BootSequence from "./motion/BootSequence";
import { EffectBoundary } from "./motion/Primitives";
import {
  motion,
  overdrive,
  readPreference,
  savePreference,
  workspaceIds,
} from "./motion/config";
const Environment = lazy(() => import("./motion/Environment"));
const InteractiveTerminal = lazy(
  () => import("./components/InteractiveTerminal"),
);
export default function App() {
  const [reduced, setReduced] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [boot, setBoot] = useState(
    () =>
      !matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !readPreference("arch:booted", "", true) &&
      !location.hash,
  );
  const [quality, setQuality] = useState(() =>
    readPreference(
      "arch:quality",
      matchMedia("(pointer: coarse)").matches ? "medium" : "ultra",
    ),
  );
  const [crt, setCrt] = useState(() =>
    Number(readPreference("arch:crt", ".35")),
  );
  const [burst, setBurst] = useState(false);
  const [terminalReady, setTerminalReady] = useState(false);
  const terminalSlot = useRef(null);
  const page = useRef(null);
  const completedBoot = useRef(false);
  const finishBoot = useCallback(() => {
    completedBoot.current = true;
    setBoot(false);
  }, []);
  useEffect(() => {
    if (!boot && completedBoot.current)
      document.querySelector("#main")?.focus({ preventScroll: true });
  }, [boot]);
  useEffect(() => {
    const visibility = () =>
      document.documentElement.toggleAttribute(
        "data-page-hidden",
        document.hidden,
      );
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => document.removeEventListener("visibilitychange", visibility);
  }, []);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReduced(media.matches);
      if (media.matches) finishBoot();
    };
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [finishBoot]);
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.quality = reduced ? "low" : quality;
    root.style.setProperty("--crt", String(crt));
    savePreference("arch:quality", quality);
    savePreference("arch:crt", String(crt));
  }, [quality, reduced, crt]);
  useEffect(() => {
    // Resolve initial deep links after React mounts the interactive layout.
    const frame = requestAnimationFrame(() => {
      const id = location.hash.slice(1);
      if (id) document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          entry.target.classList.toggle("on-screen", entry.isIntersecting);
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        }),
      { threshold: 0.06 },
    );
    document
      .querySelectorAll(".reveal, main > section")
      .forEach((el) => observer.observe(el));
    document
      .querySelectorAll(".project-list, .toolbox-groups, .now-grid")
      .forEach((group) => {
        [...group.children].forEach((el, i) =>
          el.style.setProperty("--delay", `${Math.min(i * 55, 220)}ms`),
        );
      });
    const lazyObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setTerminalReady(true);
          lazyObserver.disconnect();
        }
      },
      { rootMargin: "700px" },
    );
    lazyObserver.observe(terminalSlot.current);
    const root = document.documentElement;
    let frame;
    const progress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = root.scrollHeight - innerHeight;
        root.style.setProperty("--progress", max > 0 ? scrollY / max : 0);
      });
    };
    progress();
    window.addEventListener("scroll", progress, { passive: true });
    window.addEventListener("resize", progress);
    return () => {
      observer.disconnect();
      lazyObserver.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", progress);
      window.removeEventListener("resize", progress);
    };
  }, []);
  useEffect(() => {
    let timer;
    let keys = [];
    const activate = () => {
      setBurst(true);
      clearTimeout(timer);
      timer = setTimeout(() => setBurst(false), 6500);
    };
    const key = (e) => {
      if (e.target.closest("input,textarea,select,[contenteditable]")) return;
      keys = [...keys, e.key].slice(-10);
      if (
        keys.join(",") ===
        "ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,b,a"
      )
        overdrive();
      if (e.altKey && !e.ctrlKey && /^[1-6]$/.test(e.key)) {
        e.preventDefault();
        location.hash = workspaceIds[Number(e.key) - 1];
      }
    };
    window.addEventListener("arch:overdrive", activate);
    window.addEventListener("keydown", key);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("arch:overdrive", activate);
      window.removeEventListener("keydown", key);
    };
  }, []);
  useEffect(() => {
    let previousY = scrollY;
    let animation;
    const transition = () => {
      const id = location.hash.slice(1);
      const section = document.getElementById(id);
      if (!section || reduced) return;
      animation?.cancel();
      const direction = section.offsetTop >= previousY ? 1 : -1;
      animation = page.current.animate(
        [
          {
            opacity: 0.45,
            transform: `translateX(${direction * 25}px) scale(.995)`,
          },
          { opacity: 1, transform: "none" },
        ],
        { duration: motion.workspace, easing: motion.ease },
      );
      previousY = section.offsetTop;
    };
    window.addEventListener("hashchange", transition);
    return () => {
      animation?.cancel();
      window.removeEventListener("hashchange", transition);
    };
  }, [reduced]);
  return (
    <>
      <EffectBoundary>
        <Suspense fallback={null}>
          <Environment quality={quality} reduced={reduced} burst={burst} />
        </Suspense>
      </EffectBoundary>
      {boot && <BootSequence onComplete={finishBoot} />}
      <div
        className={`desktop-session ${boot ? "session-booting" : ""}`}
        inert={boot ? true : undefined}
      >
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <MotionDetails enabled={!boot && !reduced && quality !== "low"} />
        <Navbar />
        <div
          className="system-toolbar"
          role="region"
          aria-label="Environment settings"
        >
          <span>
            <i className="status-dot" /> SYSTEM ONLINE{" "}
            <span className="toolbar-divider">/</span>{" "}
            <span className="toolbar-extra">
              WAYLAND SESSION · PERSONAL PORTFOLIO
            </span>
          </span>
          <div>
            <CommandPalette />
            <label>
              FX{" "}
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                aria-label="Effect quality"
              >
                <option value="low">LOW</option>
                <option value="medium">MEDIUM</option>
                <option value="ultra">ULTRA</option>
              </select>
            </label>
            <label className="crt-control">
              CRT{" "}
              <input
                aria-label="CRT intensity"
                type="range"
                min="0"
                max="0.7"
                step="0.05"
                value={crt}
                onChange={(e) => setCrt(e.target.value)}
              />
            </label>
            <a href="#terminal" aria-label="Open interactive terminal">
              &gt;_
            </a>
          </div>
        </div>
        <main id="main" tabIndex={-1} ref={page}>
          <Hero ready={!boot} />
          <About />
          <Projects />
          <Toolbox />
          <section
            className="section shell terminal-section"
            id="terminal"
            ref={terminalSlot}
          >
            <EffectBoundary
              fallback={
                <div className="terminal-loading" role="status">
                  The terminal could not load.{" "}
                  <a href="#projects">Explore the projects</a> or{" "}
                  <button onClick={() => location.reload()}>
                    reload to try again
                  </button>
                  .
                </div>
              }
            >
              <Suspense
                fallback={
                  <div className="terminal-loading">
                    &gt; mounting ~/terminal...{" "}
                    <span className="block-cursor">▌</span>
                  </div>
                }
              >
                {terminalReady ? (
                  <InteractiveTerminal />
                ) : (
                  <div className="terminal-loading">
                    &gt; terminal ready to mount...
                  </div>
                )}
              </Suspense>
            </EffectBoundary>
          </section>
          <Now />
          <Contact />
        </main>
        <Footer />
        <div
          className="desktop-status"
          role="region"
          aria-label="Session status"
        >
          <span>
            ⌘ <b>ArchNemesis</b> <span className="status-separator">/</span>{" "}
            personal environment
          </span>
          <span className="status-hint">
            ALT + 1–6 <span className="status-separator">/</span> SWITCH
            WORKSPACE
          </span>
          <span>
            <i className="status-dot" />{" "}
            {reduced
              ? "REDUCED MOTION"
              : burst
                ? "RICE OVERDRIVE"
                : "ALL SYSTEMS NOMINAL"}
          </span>
        </div>
      </div>
      <div className={`overdrive-toast ${burst ? "show" : ""}`} role="status">
        {burst && ":: RICE OVERDRIVE — maximum personality installed"}
      </div>
    </>
  );
}
