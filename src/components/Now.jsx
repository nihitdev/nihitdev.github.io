import { nowItems } from "../data/portfolio";
import SectionHeading from "./SectionHeading";
export default function Now() {
  return (
    <section id="now" className="section shell">
      <SectionHeading label="RIGHT NOW" title="Always a work in progress." />
      <div className="now-grid">
        {nowItems.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <code>{item.command}</code>
          </article>
        ))}
      </div>
      <div className="opensource">
        <h3>Built in the open. Shared with everyone.</h3>
        <p>
          Useful docs, small focused repos, and tools you can actually run.
          Explore the code, open an issue, or make something your own.
        </p>
        <a
          className="text-link"
          href="https://github.com/nihitdev?tab=overview"
          target="_blank"
          rel="noreferrer"
        >
          Follow the latest activity ↗
        </a>
      </div>
    </section>
  );
}
