import { motion } from "motion/react";
import GitHubMark from "./GitHubMark";
import {
  ArrowUpRight,
  Code2,
  Palette,
  PackageOpen,
  TerminalSquare,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { projects } from "../data/portfolio";

function ProjectVisual({ type }) {
  if (type === "terminal") {
    return (
      <div className="project-visual terminal-preview">
        <div className="window-bar">
          <span className="bg-red-400/80" />
          <span className="bg-amber-300/80" />
          <span className="bg-emerald-400/80" />
          <p>oxide@terminal:~</p>
        </div>
        <div className="space-y-3 px-5 py-6 font-mono text-[0.72rem] leading-6 text-slate-300 sm:px-7 sm:text-sm">
          <p><span className="text-blue-400">$</span> oxide-terminal --boot</p>
          <p><span className="text-emerald-400">[ ok ]</span> async runtime online</p>
          <p><span className="text-emerald-400">[ ok ]</span> pty initialized</p>
          <p><span className="text-emerald-400">[ ok ]</span> ansi renderer ready</p>
          <p className="pt-2 text-blue-300">status: fast, raw, and alive<span className="terminal-cursor">_</span></p>
        </div>
      </div>
    );
  }

  if (type === "yoo") {
    return (
      <div className="project-visual relative grid place-items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(76,154,255,0.18),transparent_58%)]" />
        <PackageOpen className="absolute left-8 top-8 text-blue-400/15" size={44} />
        <Code2 className="absolute bottom-8 right-8 text-blue-400/15" size={42} />
        <div className="relative text-center">
          <p className="text-[clamp(5rem,13vw,8rem)] font-black leading-none tracking-[-0.09em] text-blue-400 drop-shadow-[0_0_35px_rgba(67,145,255,0.28)]">yoo</p>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.24em] text-slate-400">developer companion</p>
        </div>
      </div>
    );
  }

  return (
    <div className="project-visual relative grid place-items-center overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(35,55,103,0.7),rgba(8,11,20,0.45)),radial-gradient(circle_at_30%_20%,rgba(84,165,255,0.22),transparent_45%)]" />
      <div className="relative w-[82%] rounded-2xl border border-white/10 bg-[#090d18]/85 p-4 shadow-2xl backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div className="flex gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-400"/><span className="h-2 w-2 rounded-full bg-indigo-400"/><span className="h-2 w-2 rounded-full bg-sky-300"/></div>
          <Palette size={16} className="text-blue-400" />
        </div>
        <div className="space-y-3">
          <div className="h-3 w-3/5 rounded-full bg-blue-400/60" />
          <div className="grid grid-cols-3 gap-2">
            <div className="h-16 rounded-lg bg-blue-500/15" />
            <div className="h-16 rounded-lg bg-indigo-500/15" />
            <div className="h-16 rounded-lg bg-sky-500/15" />
          </div>
          <div className="h-2 w-full rounded-full bg-white/10" />
          <div className="h-2 w-4/5 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-shell py-28 sm:py-36">
      <SectionHeading
        eyebrow="THINGS I'VE BUILT"
        title="Featured Projects"
        description="Real projects, real releases, and a lot of learning hidden behind every commit."
      />

      <div className="space-y-8">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            className="project-card group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProjectVisual type={project.type} />

            <div className="relative flex flex-col justify-center p-6 sm:p-10 lg:p-12">
              <span className="absolute right-7 top-5 font-mono text-sm text-blue-400/25 sm:right-10 sm:top-8">
                {project.number}
              </span>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-blue-400">{project.subtitle}</p>
              <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{project.title}</h3>
              <p className="mt-5 max-w-2xl leading-8 text-slate-400">{project.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-blue-400/15 bg-blue-500/[0.08] px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-wide text-blue-300">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a href={project.source} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-bold text-white transition hover:text-blue-300">
                  <GitHubMark size={18} /> Source <ArrowUpRight size={17} />
                </a>
                <a href={project.details} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-bold text-blue-400 transition hover:text-blue-300">
                  Explore <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.a
        href="https://github.com/nihitdev?tab=repositories"
        target="_blank"
        rel="noreferrer"
        className="mx-auto mt-10 flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-6 py-3 font-semibold text-slate-300 transition hover:-translate-y-1 hover:border-blue-400/30 hover:text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <TerminalSquare size={19} className="text-blue-400" /> Explore all repositories <ArrowUpRight size={17} />
      </motion.a>
    </section>
  );
}
