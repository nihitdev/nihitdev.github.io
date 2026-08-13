import { Terminal } from "lucide-react";
import { nowItems } from "../data/portfolio";

export default function Now() {
  return (
    <section id="now" className="section shell">
      <div className="section-head">
        <p>04 / CURRENTLY</p>
        <h2>Still changing the prompt symbol.</h2>
      </div>

      <div className="now-grid">
        {nowItems.map((item) => (
          <article className="now-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="command"><Terminal size={14} /><code>{item.command}</code></div>
          </article>
        ))}
      </div>

      <div className="prompt-line">
        <span>λ</span><span>→</span><span>ζ</span><span>→</span><span>╰─❯</span><span>→</span><span>Ω</span><span>→</span><span>∴</span><span>→</span><span>λ</span>
      </div>
    </section>
  );
}
