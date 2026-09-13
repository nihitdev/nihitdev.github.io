import { ArrowUpRight, Folder, GitBranch } from "lucide-react";
import GitHubIcon from "./GitHubIcon";
import { projects } from "../data/portfolio";
import SectionHeading from "./SectionHeading";
function ProjectVisual({ variant }) {
  return (
    <div className={`project-visual ${variant}`} aria-hidden="true">
      {variant === "dotfiles" ? (
        <div className="mini-terminal">
          <div className="mini-bar">
            <span>● ● ●</span> ~/.config / a setup of my own
          </div>
          <div className="mini-content">
            <span className="config-tree">
              .config
              <br />
              ├── fish
              <br />
              ├── nvim
              <br />
              ├── starship.toml
              <br />
              ╰── a little personality
            </span>
            <span className="config-symbol">
              ❯<span>_</span>
            </span>
          </div>
          <div className="mini-status">
            <GitBranch size={11} /> main{" "}
            <span>everything in its right place.</span>
          </div>
        </div>
      ) : (
        <div className="discord-preview">
          <aside>
            <span>~</span>
            <span>#</span>
            <span>λ</span>
          </aside>
          <div className="discord-channels">
            <b>shellcord</b>
            <span># general</span>
            <span className="selected"># terminal-talk</span>
            <span># dotfiles</span>
            <small>VOICE CHANNELS</small>
            <span>⌁ the workspace</span>
          </div>
          <div className="discord-chat">
            <b># terminal-talk</b>
            <p>
              <i>n</i>
              <span>
                <strong>
                  nihitdev <small>today at 16:42</small>
                </strong>
                <br />a shell-inspired space.
                <br />
                <em>less noise. more personality.</em>
              </span>
            </p>
            <div className="chat-input">
              Message #terminal-talk <span>+</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function Tags({ tags }) {
  return (
    <div className="tags">
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  );
}
export default function Projects() {
  return (
    <section id="projects" className="section shell reveal">
      <SectionHeading
        number="03"
        label="SELECTED WORK"
        title={
          <>
            Built to be used<span className="accent">.</span>
          </>
        }
      >
        <a
          className="text-link"
          href="https://github.com/nihitdev?tab=repositories"
          target="_blank"
          rel="noreferrer"
        >
          All repositories <ArrowUpRight size={15} />
        </a>
      </SectionHeading>
      <div className="featured-grid">
        {projects.slice(0, 2).map((project, i) => (
          <article className="featured-project" key={project.title}>
            <ProjectVisual variant={project.title} />
            <div className="project-content">
              <div className="project-top">
                <span>
                  <span className="dot" />{" "}
                  {i === 0 ? "THE PERSONAL SETUP" : "A DIFFERENT KIND OF THEME"}
                </span>
                <span>0{i + 1}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-bottom">
                <Tags tags={project.tags} />
                <a
                  className="project-link"
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <GitHubIcon size={16} /> GitHub <ArrowUpRight size={15} />
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    className="project-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live demo <ArrowUpRight size={15} />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="more-projects-label">
        <span>MORE FROM THE WORKBENCH</span>
        <span>SMALL REPOS. CLEAR PURPOSE.</span>
      </div>
      <div className="project-list">
        {projects.slice(2).map((project, i) => (
          <a
            className="project-row"
            key={project.title}
            href={project.href}
            target="_blank"
            rel="noreferrer"
          >
            <span className="project-number">0{i + 3}</span>
            <Folder className="folder-icon" size={20} />
            <div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
            <Tags tags={project.tags} />
            <ArrowUpRight className="row-arrow" size={20} />
          </a>
        ))}
      </div>
    </section>
  );
}
