import { ArrowUpRight } from "lucide-react";
export default function Hero() {
  return (
    <section id="home" className="hero shell">
      <p className="eyebrow">DEVELOPER & LINUX ENTHUSIAST · INDIA</p>
      <h1>
        Nihit Sunhare<span className="accent">.</span>
      </h1>
      <h2>
        Small tools.
        <br />
        Better workflows.
      </h2>
      <p className="lead">
        I build useful things and obsess over the little details that make them
        feel right. Linux utilities, shell experiments, and a setup that feels
        like home.
      </p>
      <div className="hero-actions">
        <a className="button primary" href="#projects">
          Explore projects <ArrowUpRight size={18} />
        </a>
        <a
          className="text-link"
          href="https://github.com/nihitdev"
          target="_blank"
          rel="noreferrer"
        >
          GitHub <ArrowUpRight size={18} />
        </a>
      </div>
      <a className="hero-note" href="#terminal">
        <span aria-hidden="true">~/</span> More comfortable in a shell? Try the
        terminal <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}
