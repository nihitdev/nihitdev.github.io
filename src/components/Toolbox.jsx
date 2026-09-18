import { useState } from "react";
import { ArchLogo, WindowBar } from "../motion/Primitives";
import {
  Code2,
  Terminal,
  Braces,
  Monitor,
  Wrench,
  Package,
} from "lucide-react";
import { toolbox } from "../data/portfolio";
import SectionHeading from "./SectionHeading";
const icons = [Code2, Terminal, Braces, Monitor, Wrench, Package];
export default function Toolbox() {
  const [active, setActive] = useState(0);
  const nodes = [
    ["Rust", "Systems & command-line tools", 22, 27],
    ["TypeScript", "Typed developer experiences", 71, 22],
    ["Go", "Small, useful utilities", 85, 55],
    ["JavaScript", "Interactive web experiments", 70, 82],
    ["Linux", "The foundation of my workflow", 28, 80],
    ["Shell", "Making everyday workflows nicer", 12, 53],
  ];
  return (
    <section id="toolbox" className="section shell reveal">
      <SectionHeading
        number="03"
        label="THE TOOLBOX"
        title="Tools I reach for."
      >
        <p>
          Different tools. One goal.
          <br /> Make something useful.
        </p>
      </SectionHeading>
      <div className="stack-constellation reveal">
        <WindowBar
          title="~/.local/share/technology-map"
          detail="hover or focus a node"
        />
        <div className="constellation-field">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {nodes.map((node, i) => (
              <path
                key={node[0]}
                className={active === i ? "active" : ""}
                d={`M50 50 Q${node[2]} 50 ${node[2]} ${node[3]}`}
              />
            ))}
          </svg>
          <div className="constellation-core">
            <ArchLogo />
            <span>THE ECOSYSTEM</span>
          </div>
          {nodes.map(([name, , x, y], i) => (
            <button
              key={name}
              className={`tech-node ${active === i ? "selected" : ""}`}
              style={{ "--node-x": `${x}%`, "--node-y": `${y}%`, "--i": i }}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              aria-describedby="tech-description"
            >
              <span className="node-glyph">
                {["Rs", "TS", "Go", "JS", "~", ">_"][i]}
              </span>
              {name}
              <i />
            </button>
          ))}
        </div>
        <div className="constellation-caption" id="tech-description">
          <span>
            <b>{nodes[active][0]}</b> / {nodes[active][1]}
          </span>
          <span>CONNECTED TO MY DAILY DRIVER</span>
        </div>
      </div>
      <div className="toolbox-groups">
        {toolbox.map((group, i) => {
          const Icon = icons[i];
          return (
            <div className="toolbox-group reveal" key={group.title}>
              <h3>
                <Icon size={16} />
                {group.title}
              </h3>
              <p>
                {[...new Set(group.items)].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
