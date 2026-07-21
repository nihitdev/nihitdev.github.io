import { motion } from "motion/react";
import GitHubMark from "./GitHubMark";
import {
  ArrowDown,
  ArrowRight,
  Braces,
  GitBranch,
  MessageCircle,
  Terminal,
} from "lucide-react";

const iconMotion = {
  animate: {
    y: [0, -12, 0],
    rotate: [0, 3, 0],
  },
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-5 pb-16 pt-28 sm:px-8">
      <motion.div
        className="absolute left-[7%] top-[28%] hidden text-blue-400/15 lg:block"
        {...iconMotion}
      >
        <Braces size={52} strokeWidth={1.5} />
      </motion.div>
      <motion.div
        className="absolute right-[7%] top-[39%] hidden text-blue-400/15 lg:block"
        animate={{ y: [0, 14, 0], rotate: [0, -4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Terminal size={54} strokeWidth={1.5} />
      </motion.div>
      <motion.div
        className="absolute bottom-[16%] right-[15%] hidden text-blue-400/10 lg:block"
        animate={{ y: [0, -10, 0], x: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <GitBranch size={48} strokeWidth={1.5} />
      </motion.div>

      <div className="mx-auto w-full max-w-7xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-8 flex flex-col items-center gap-4">
            <p className="section-kicker">DEVELOPER & CREATOR</p>
            <a href="#now" className="status-pill group" aria-label="See what Nihit is currently working on">
              <span className="status-dot" />
              Currently building in public
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto max-w-6xl"
          initial={{ opacity: 0, y: 34, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.95, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[9%] -translate-x-1/2 whitespace-nowrap text-[clamp(5.8rem,20vw,15rem)] font-black leading-[0.78] tracking-[-0.09em] text-[#101527]/80"
          >
            NIHIT
          </span>
          <h1 className="relative z-10 text-[clamp(5.2rem,18vw,14rem)] font-black leading-[0.78] tracking-[-0.09em] text-[#f4f6ff] drop-shadow-[0_12px_65px_rgba(0,0,0,0.55)]">
            NIHIT
          </h1>
          <motion.span
            className="relative z-0 mx-auto mt-[-0.9rem] block h-4 w-[58%] max-w-[610px] rounded-sm bg-gradient-to-r from-blue-500/75 via-sky-400/85 to-blue-400/35 shadow-[0_0_44px_rgba(66,150,255,0.18)] sm:mt-[-1.6rem] sm:h-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.48 }}
        >
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.4em] text-blue-300 sm:text-base">
            Sunhare
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            I build terminal tools, Rust experiments, open-source projects, and ridiculously polished developer setups.
          </p>
        </motion.div>

        <motion.div
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.62 }}
        >
          <a
            href="https://github.com/nihitdev"
            target="_blank"
            rel="noreferrer"
            className="primary-button w-full sm:w-auto"
          >
            <GitHubMark size={21} /> View my GitHub <ArrowRight size={20} />
          </a>
          <a href="#projects" className="secondary-button w-full sm:w-auto">
            Explore my work <ArrowDown size={18} />
          </a>
        </motion.div>

        <motion.div
          className="mt-12 flex justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.85 }}
        >
          {[
            { icon: GitHubMark, label: "GitHub", href: "https://github.com/nihitdev" },
            { icon: Terminal, label: "Projects", href: "#projects" },
            { icon: MessageCircle, label: "Contact", href: "#contact" },
          ].map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={label}
              className="grid h-12 w-12 place-items-center rounded-full border border-white/[0.06] bg-[#11182a]/80 text-blue-400 shadow-xl transition hover:-translate-y-1 hover:border-blue-400/30 hover:bg-blue-500/15 hover:text-blue-200"
            >
              <Icon size={19} />
            </a>
          ))}
        </motion.div>

        <motion.a
          href="#about"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-blue-400 sm:block"
          aria-label="Scroll to about section"
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={34} />
        </motion.a>
      </div>
    </section>
  );
}
