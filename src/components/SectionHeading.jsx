export default function SectionHeading({ label, title, children }) {
  return (
    <div className="section-head">
      <p className="eyebrow">{label}</p>
      <div className="heading-row">
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}
