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
  return (
    <section id="toolbox" className="section shell reveal">
      <SectionHeading
        number="02"
        label="THE TOOLBOX"
        title="Tools I reach for."
      >
        <p>
          Different tools. One goal.
          <br /> Make something useful.
        </p>
      </SectionHeading>
      <div className="stack-ribbon">
        {[
          ["Rs", "Rust"],
          ["TS", "TypeScript"],
          ["JS", "JavaScript"],
          ["Go", "Go"],
          [">_", "Linux"],
          ["▤", "Podman"],
        ].map(([mark, name]) => (
          <div key={name}>
            <span className={`stack-icon stack-${name.toLowerCase()}`}>
              {mark}
            </span>
            <span>{name}</span>
          </div>
        ))}
      </div>
      <div className="toolbox-groups">
        {toolbox.map((group, i) => {
          const Icon = icons[i];
          return (
            <div className="toolbox-group" key={group.title}>
              <h3>
                <Icon size={16} />
                {group.title}
              </h3>
              <p>
                {group.items.map((item) => (
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
