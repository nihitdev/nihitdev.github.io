import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import GitHubMark from "./GitHubMark";

export default function Contact() {
  return (
    <section id="contact" className="section-shell py-24 sm:py-32">
      <motion.div
        className="relative overflow-hidden rounded-[2rem] border border-blue-300/15 bg-[#101728]/80 px-6 py-16 text-center shadow-[0_35px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:px-12 sm:py-24"
        initial={{ opacity: 0, y: 38 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(70,153,255,0.24),transparent_48%)]" />
        <div className="absolute -left-24 bottom-[-8rem] h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -right-24 top-[-8rem] h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-3xl">
          <span className="mx-auto mb-7 grid h-14 w-14 place-items-center rounded-2xl border border-blue-300/20 bg-blue-500/15 text-blue-300 shadow-lg shadow-blue-950/30">
            <Sparkles size={25} />
          </span>
          <p className="section-kicker">LET&apos;S BUILD SOMETHING</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-white sm:text-6xl">Have an idea?</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Explore my code, follow what I&apos;m building, and watch the portfolio evolve with every new project.
          </p>
          <a
            href="https://github.com/nihitdev"
            target="_blank"
            rel="noreferrer"
            className="primary-button mt-9"
          >
            <GitHubMark size={20} /> Visit GitHub <ArrowRight size={20} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
