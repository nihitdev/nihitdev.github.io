import { motion } from "motion/react";
import { ArrowUpRight, Braces, Palette, Rocket, Terminal } from "lucide-react";
import SectionHeading from "./SectionHeading";

const focusItems = [
  {
    icon: Rocket,
    label: "Building",
    title: "Rust-powered tools",
    description: "Small, fast developer utilities that make the terminal more useful and a little more fun.",
    command: "cargo build --release",
    href: "https://github.com/nihitdev/yo-cli",
  },
  {
    icon: Braces,
    label: "Learning",
    title: "Systems, one layer deeper",
    description: "Exploring async runtimes, terminal internals, performance, and how polished tools work underneath.",
    command: "rustc --explain curiosity",
    href: "https://github.com/nihitdev/rust_terminal",
  },
  {
    icon: Palette,
    label: "Tuning",
    title: "The perfect workspace",
    description: "Refining PowerShell, Windows Terminal, themes, prompts, aliases, and every tiny interaction.",
    command: "dotfiles sync --all",
    href: "https://github.com/nihitdev/dotfiles",
  },
];

export default function Now() {
  return (
    <section id="now" className="section-shell py-28 sm:py-36">
      <SectionHeading
        eyebrow="CURRENTLY IN THE TERMINAL"
        title="What I'm Up To"
        description="A live snapshot of the ideas, skills, and tiny details getting my attention right now."
      />

      <div className="now-grid">
        {focusItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="now-card group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-start justify-between gap-5">
                <span className="now-icon"><Icon size={23} /></span>
                <ArrowUpRight size={19} className="text-blue-400/50 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-300" />
              </div>
              <p className="mt-8 font-mono text-[0.68rem] font-bold uppercase tracking-[0.24em] text-blue-400">{item.label}</p>
              <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-white">{item.title}</h3>
              <p className="mt-4 leading-7 text-slate-400">{item.description}</p>
              <div className="command-line">
                <Terminal size={14} className="shrink-0 text-blue-400" />
                <code>{item.command}</code>
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
