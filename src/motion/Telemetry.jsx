export default function Telemetry() {
  return (
    <div className="motion-telemetry" aria-hidden="true">
      <span className="telemetry-label">SIGNAL /</span>
      <div className="telemetry-bars">
        {Array.from({ length: 24 }, (_, i) => (
          <i
            key={i}
            style={{ "--i": i, "--height": `${5 + ((i * 13) % 19)}px` }}
          />
        ))}
      </div>
      <span className="telemetry-packets">
        <span>0101 · INIT · 0xAF · SYNC · 1010 · EXEC · 0xFF · LIVE · </span>
      </span>
    </div>
  );
}
