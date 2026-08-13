import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/portfolio";

export default function Projects() {
  return (
    <section id="projects" className="section shell">
      <div className="section-head row">
        <div>
          <p>03 / TERMINAL ECOSYSTEM</p>
          <h2>Small repos. Clear purpose.</h2>
        </div>
        <a className="text-link" href="https://github.com/nihitdev?tab=repositories" target="_blank" rel="noreferrer">
          all repositories <ArrowUpRight size={16} />
        </a>
      </div>

      <div className="project-grid">
        {projects.map((project, index) => (
          <motion.a
            key={project.title}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="project-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: (index % 3) * 0.06 }}
          >
            <div className="project-top">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <ArrowUpRight size={18} />
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tags">
              {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
