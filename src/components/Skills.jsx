import { motion } from "motion/react";
import { Braces, Wrench } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { languageSkills, toolSkills } from "../data/portfolio";

function SkillRow({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <div className="skill-row flex items-center justify-between gap-4">
        <span className="font-semibold text-slate-200">{skill.name}</span>
        <span className="skill-level">{skill.level}</span>
      </div>
    </motion.div>
  );
}

function SkillPanel({ title, icon: Icon, skills, delay = 0 }) {
  return (
    <motion.article
      className="glass-card relative overflow-hidden p-6 sm:p-9"
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
    >
      <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-blue-500/[0.07] blur-3xl" />
      <div className="relative mb-9 flex items-center gap-4">
        <span className="grid h-14 w-14 place-items-center rounded-2xl border border-blue-300/10 bg-[#242d57] text-blue-400 shadow-xl shadow-black/20">
          <Icon size={27} strokeWidth={2.2} />
        </span>
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-blue-400/70">Skillset</p>
          <h3 className="mt-1 text-xl font-bold text-white sm:text-2xl">{title}</h3>
        </div>
      </div>

      <div className="relative space-y-7">
        {skills.map((skill, index) => (
          <SkillRow key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </motion.article>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-shell py-28 sm:py-36">
      <SectionHeading
        eyebrow="WHAT I WORK WITH"
        title="Tools of the Trade"
        description="A practical toolkit shaped by shipping projects—not a collection of arbitrary percentage bars."
      />

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <SkillPanel title="Languages" icon={Braces} skills={languageSkills} />
        <SkillPanel title="Tools & Others" icon={Wrench} skills={toolSkills} delay={0.08} />
      </div>
    </section>
  );
}
