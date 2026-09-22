import { toolbox } from "../data/portfolio";
export default function Toolbox() {
  return (
    <details id="toolbox" className="shell toolbox-section">
      <summary>
        Tools I reach for <span>Languages, systems & everyday tools</span>
      </summary>
      <div className="toolbox-groups">
        {toolbox.map((group) => (
          <div className="toolbox-group" key={group.title}>
            <h3>{group.title}</h3>
            <p>{[...new Set(group.items)].join(" · ")}</p>
          </div>
        ))}
      </div>
    </details>
  );
}
