import { useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { projects } from "../data/portfolio";
import SectionHeading from "./SectionHeading";
export default function Projects() {
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  function row(project, index) {
    return (
      <article className="project-row" key={project.title}>
        <span className="project-number">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h3>
            <a href={project.href} target="_blank" rel="noreferrer">
              {project.title} <ArrowUpRight size={19} />
            </a>
          </h3>
          <p>{project.description}</p>
          <p className="project-meta">{project.tags.join(" · ")}</p>
        </div>
        <button
          className="text-link project-details"
          aria-label={`Inspect ${project.title}`}
          onClick={() => {
            setSelected(project);
            dialog.current.showModal();
          }}
        >
          Details
        </button>
      </article>
    );
  }
  return (
    <section id="projects" className="section shell">
      <SectionHeading label="SELECTED WORK" title="Built to be used.">
        <a
          className="text-link"
          href="https://github.com/nihitdev?tab=repositories"
          target="_blank"
          rel="noreferrer"
        >
          All repositories <ArrowUpRight size={16} />
        </a>
      </SectionHeading>
      <div className="project-list">{projects.slice(0, 3).map(row)}</div>
      <details className="more-projects">
        <summary>
          More from the workbench <span>{projects.length - 3} projects</span>
        </summary>
        <div className="project-list">
          {projects.slice(3).map((project, i) => row(project, i + 3))}
        </div>
      </details>
      <dialog
        className="project-dialog"
        ref={dialog}
        aria-labelledby="project-dialog-title"
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current.close();
        }}
      >
        {selected && (
          <div className="dialog-content">
            <button
              className="icon-button dialog-close"
              aria-label="Close project details"
              onClick={() => dialog.current.close()}
            >
              <X />
            </button>
            <p className="eyebrow">OPEN SOURCE / PROJECT DETAILS</p>
            <h2 id="project-dialog-title">{selected.title}</h2>
            <p>{selected.description}</p>
            <p className="project-meta">{selected.tags.join(" · ")}</p>
            <a
              className="button primary"
              href={selected.href}
              target="_blank"
              rel="noreferrer"
            >
              Explore repository <ArrowUpRight size={16} />
            </a>
            {selected.demo && (
              <a
                className="text-link"
                href={selected.demo}
                target="_blank"
                rel="noreferrer"
              >
                Live demo ↗
              </a>
            )}
          </div>
        )}
      </dialog>
    </section>
  );
}
