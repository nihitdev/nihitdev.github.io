import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { stats } from "../data/portfolio";

function AnimatedValue({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const [display, setDisplay] = useState(typeof value === "number" ? 0 : value);

  useEffect(() => {
    if (!inView || typeof value !== "number") return undefined;

    let frame;
    const duration = 1100;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="section-shell py-28 sm:py-36">
      <SectionHeading eyebrow="GET TO KNOW ME" title="About Me" />

      <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_1fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -34 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -left-5 top-1 h-20 w-1 rounded-full bg-gradient-to-b from-blue-400 to-transparent" />
          <div className="space-y-6 text-base leading-8 text-slate-400 sm:text-lg sm:leading-9">
            <p>
              Hi, I&apos;m <strong className="font-bold text-white">Nihit Sunhare</strong>, a developer and creator who loves building
              <span className="font-semibold text-blue-400"> terminal tools</span>, experimenting with
              <span className="font-semibold text-blue-400"> Rust</span>, and exploring how software works under the hood.
            </p>
            <p>
              I live in Git, terminals, open source, and customized workspaces. I care about making software feel fast, useful,
              and unmistakably mine.
            </p>
          </div>

          <a
            href="https://github.com/nihitdev?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="mt-9 inline-flex items-center gap-2 font-bold text-blue-400 transition hover:gap-3 hover:text-blue-300"
          >
            Explore my repositories <ArrowUpRight size={18} />
          </a>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-4 sm:gap-6"
          initial={{ opacity: 0, x: 34 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {stats.map((stat, index) => (
            <motion.article
              key={stat.label}
              className="stat-card group"
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            >
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent opacity-0 transition group-hover:opacity-100" />
              <strong className="text-4xl font-extrabold tracking-tight text-blue-400 sm:text-5xl">
                <AnimatedValue value={stat.value} suffix={stat.suffix} />
              </strong>
              <p className="mt-3 text-center text-[0.68rem] font-semibold uppercase tracking-[0.19em] text-slate-400 sm:text-xs">
                {stat.label}
              </p>
              <span className="absolute right-4 top-4 font-mono text-xs text-blue-400/25">0{index + 1}</span>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
