import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Toolbox from "./components/Toolbox";
import Now from "./components/Now";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SectionHeading from "./components/SectionHeading";
import { EffectBoundary } from "./motion/Primitives";
import { workspaceIds } from "./motion/config";
import InteractiveTerminal from "./components/InteractiveTerminal";
export default function App() {
  useEffect(() => {
    const navigate = (event) => {
      const section = document.getElementById(location.hash.slice(1));
      if (section) {
        const wasClosed = section.tagName === "DETAILS" && !section.open;
        if (wasClosed) section.open = true;
        // Native anchor navigation handles ordinary links and history. Only
        // correct the initial position or a disclosure whose layout changed.
        if (!event || wasClosed)
          section.scrollIntoView({ behavior: "instant" });
      }
    };
    const key = (event) => {
      if (event.target.closest("input,textarea,select,[contenteditable]"))
        return;
      if (event.altKey && !event.ctrlKey && /^[1-6]$/.test(event.key)) {
        event.preventDefault();
        location.hash = workspaceIds[Number(event.key) - 1];
      }
    };
    navigate();
    window.addEventListener("hashchange", navigate);
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("hashchange", navigate);
      window.removeEventListener("keydown", key);
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
        <Projects />
        <About />
        <Toolbox />
        <section id="terminal" className="section shell">
          <SectionHeading
            label="A DIFFERENT WAY TO EXPLORE"
            title="At home in the terminal."
          />
          <p className="section-intro">
            A small, simulated shell for this portfolio. Try{" "}
            <code>cd projects</code>, then <code>ls</code>.
          </p>
          <EffectBoundary
            fallback={
              <p role="status">
                The terminal couldn’t load.{" "}
                <a href="#projects">Browse projects</a> or{" "}
                <button onClick={() => location.reload()}>reload</button>.
              </p>
            }
          >
            <InteractiveTerminal />
          </EffectBoundary>
        </section>
        <Now />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
