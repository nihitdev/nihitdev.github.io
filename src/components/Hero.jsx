import { motion } from "motion/react";
import { ArrowDown, MapPin, Terminal } from "lucide-react";
import GitHubIcon from "./GitHubIcon";

export default function Hero() {
  return (
    <section id="home" className="hero shell">
      <div className="hero-grid">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="eyebrow"><span className="dot" /> building in public <MapPin size={14} /> India</div>
          <p className="kicker">LINUX · TERMINAL · SHELLS · DOTFILES · DEVELOPER TOOLS</p>
          <h1>I build a terminal setup <span>worth living in.</span></h1>
          <p className="lead">
            I'm Nihit Sunhare. I build small Linux utilities, terminal experiments, shell configs,
            curated references, and tools that make everyday developer workflows nicer.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#projects">Explore the ecosystem <ArrowDown size={18} /></a>
            <a className="button secondary" href="https://github.com/nihitdev" target="_blank" rel="noreferrer">
              <GitHubIcon size={18} /> github/nihitdev
            </a>
          </div>
          <div className="hero-meta">
            <span><b>OS</b> CachyOS</span>
            <span><b>Shell</b> Fish / Zsh</span>
            <span><b>Desktop</b> KDE Plasma</span>
          </div>
        </motion.div>

        <motion.div
          className="terminal-card"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.12 }}
        >
          <div className="terminal-bar">
            <div className="traffic"><i /><i /><i /></div>
            <span>nihit@cachyos: ~/Projects</span>
            <Terminal size={16} />
          </div>
          <div className="terminal-body">
            <p><b>λ</b> whoami</p>
            <p className="result">Nihit Sunhare <span>/ terminal guy</span></p>
            <p><b>λ</b> stack --current</p>
            <div className="chips">
              <span>CachyOS</span><span>Fish</span><span>Zsh</span><span>Starship</span>
              <span>Rust</span><span>Go</span><span>TypeScript</span><span>Docker</span>
            </div>
            <p><b>λ</b> git status</p>
            <p className="success">On branch main — nothing to commit, still cooking.</p>
            <p><b>λ</b> <span className="cursor">_</span></p>
          </div>
          <div className="terminal-footer"><span>UTF-8</span><span>truecolor</span><span>λ home</span></div>
        </motion.div>
      </div>
    </section>
  );
}
