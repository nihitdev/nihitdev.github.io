import {
  ArrowUpRight,
  GitPullRequest,
  Terminal,
  GitBranch,
} from "lucide-react";
import GitHubIcon from "./GitHubIcon";
import { nowItems, projects } from "../data/portfolio";
import SectionHeading from "./SectionHeading";
export default function Now() {
  return (
    <section id="now" className="section shell reveal">
      <SectionHeading
        number="05"
        label="OPEN SOURCE & RIGHT NOW"
        title="Always a work in progress."
      />
      <div className="opensource">
        <div className="opensource-icon">
          <GitHubIcon size={40} />
        </div>
        <div>
          <h3>Built in the open. Shared with everyone.</h3>
          <p>
            Useful docs, small focused repos, and tools you can actually run.
            <br /> Explore the code, open an issue, or make something your own.
          </p>
          <a
            className="text-link"
            href="https://github.com/nihitdev?tab=overview"
            target="_blank"
            rel="noreferrer"
          >
            Follow the latest activity <ArrowUpRight size={15} />
          </a>
        </div>
        <a
          className="repo-count"
          href="https://github.com/nihitdev?tab=repositories"
          target="_blank"
          rel="noreferrer"
        >
          <strong>
            {String(projects.length).padStart(2, "0")}
            <ArrowUpRight size={22} />
          </strong>
          <span>repositories featured here</span>
        </a>
      </div>
      <div className="repo-graph reveal">
        <div className="repo-graph-title">
          <GitBranch size={16} /> git log --featured{" "}
          <span>LOCAL PROJECT INDEX · NOT LIVE ACTIVITY</span>
        </div>
        {projects.map((p, i) => (
          <a
            href={p.href}
            target="_blank"
            rel="noreferrer"
            key={p.title}
            className="repo-node"
            style={{ "--i": i }}
          >
            <span className="branch-dot" />
            <code>{String(i + 1).padStart(2, "0")}</code>
            <strong>{p.title}</strong>
            <span>{p.tags[0]}</span>
            <ArrowUpRight size={14} />
          </a>
        ))}
      </div>
      <div className="now-grid">
        {nowItems.map((item, i) => (
          <article className="now-card reveal" key={item.title}>
            <span className="now-index">
              {i === 1 ? <GitPullRequest size={16} /> : <Terminal size={16} />}{" "}
              CURRENTLY / 0{i + 1}
            </span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <code>
              <span>❯</span> {item.command}
            </code>
          </article>
        ))}
      </div>
      <div className="prompt-line">
        <span>A never-ending search for the perfect prompt.</span>
        <span>
          λ → ζ → ╰─❯ → Ω → ∴ → <b>λ</b>
        </span>
      </div>
    </section>
  );
}
