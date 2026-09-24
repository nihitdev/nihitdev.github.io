import { CircuitDivider } from "../motion/Primitives";
export default function SectionHeading({ number, label, title, children }) {
  return (
    <div className="section-head">
      <CircuitDivider />
      <p className="eyebrow">
        <span>{number}</span> / {label}
      </p>
      <div className="heading-row">
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}
