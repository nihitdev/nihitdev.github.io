import { motion } from "motion/react";

export default function About() {
  return (
    <section id="about" className="section shell">
      <div className="section-head">
        <p>01 / WHOAMI</p>
        <h2>Linux is home.</h2>
      </div>

      <div className="about-grid">
        <motion.div
          className="copy-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p>
            I like building small things that make the terminal more useful: shell snippets, prompt
            presets, Linux references, environment checkers, interactive demos, and dotfiles.
          </p>
          <p>
            My setup changes constantly, but the goal stays the same: understand the tools, keep the
            workflow fast, and make the machine feel personal.
          </p>
        </motion.div>

        <div className="whoami-card">
          <code>
            OS        CachyOS{"\n"}
            Shell     Fish / Zsh{"\n"}
            Desktop   KDE Plasma{"\n"}
            Terminal  Konsole{"\n"}
            Prompt    Starship{"\n"}
            Editor    Neovim / Nano{"\n"}
            Focus     Linux · CLI · Dotfiles{"\n"}
            Status    cooking
          </code>
        </div>
      </div>
    </section>
  );
}
