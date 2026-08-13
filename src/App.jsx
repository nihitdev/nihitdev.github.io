import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Toolbox from "./components/Toolbox";
import Projects from "./components/Projects";
import Now from "./components/Now";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <div className="noise" aria-hidden="true" />
      <Navbar />
      <main>
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
