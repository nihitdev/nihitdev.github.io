import { motion } from "motion/react";
import GitHubMark from "./GitHubMark";
import { ArrowDown, ArrowRight, MapPin, Sparkles, Terminal } from "lucide-react";

const reveal = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section id="home" className="hero-section section-shell relative flex min-h-screen items-center py-28 sm:py-32">
      <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-two" aria-hidden="true" />

      <div className="relative z-10 grid w-full items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        <div>
          <motion.div {...reveal} transition={{ duration: 0.65 }} className="flex flex-wrap items-center gap-3">
            <a href="#now" className="status-pill group">
              <span className="status-dot" /> Building in public
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
            <span className="hero-location"><MapPin size={14} /> India · UTC+5:30</span>
          </motion.div>

          <motion.div
            {...reveal}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8"
          >
            <p className="section-kicker">DEVELOPER · MAKER · TERMINAL NERD</p>
            <h1 className="hero-title mt-5">
              I build tools that feel <span>fast.</span>
            </h1>
            <p className="hero-copy">
              I&apos;m Nihit Sunhare — a developer turning Rust experiments, terminal ideas, and obsessive workspace tweaks into useful open-source software.
            </p>
          </motion.div>

          <motion.div
            {...reveal}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <a href="#projects" className="primary-button">
              See selected work <ArrowDown size={19} />
            </a>
            <a href="https://github.com/nihitdev" target="_blank" rel="noreferrer" className="secondary-button">
              <GitHubMark size={20} /> github/nihitdev
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }}
            className="hero-metrics"
          >
            <div><dt>Focus</dt><dd>Rust + DX</dd></div>
            <div><dt>Currently</dt><dd>Shipping CLIs</dd></div>
            <div><dt>Mode</dt><dd>Always learning</dd></div>
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32, rotate: 1.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="hero-terminal-wrap"
        >
          <div className="hero-terminal-glow" />
          <div className="hero-terminal">
            <div className="hero-terminal-bar">
              <div className="flex gap-2" aria-hidden="true"><i /><i /><i /></div>
              <span>nihit@dev: ~/workbench</span>
              <Terminal size={16} />
            </div>
            <div className="hero-terminal-body">
              <p><b>❯</b> whoami</p>
              <p className="terminal-result">Nihit Sunhare <span>/ developer &amp; creator</span></p>
              <p><b>❯</b> stack --current</p>
              <div className="terminal-stack">
                <span>Rust</span><span>JavaScript</span><span>React</span><span>PowerShell</span>
              </div>
              <p><b>❯</b> cargo run --release</p>
              <p className="terminal-success"><Sparkles size={15} /> Compiled curiosity in 0.42s</p>
              <p><b>❯</b> <span className="terminal-cursor">_</span></p>
            </div>
            <div className="hero-terminal-footer">
              <span>main*</span><span>UTF-8</span><span>rustc 1.x</span>
            </div>
          </div>
          <div className="floating-note floating-note-top"><span>30+</span> projects shipped</div>
          <div className="floating-note floating-note-bottom"><span>∞</span> curiosity</div>
        </motion.div>
      </div>
    </section>
  );
}
