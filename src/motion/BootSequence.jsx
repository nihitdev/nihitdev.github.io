import { useEffect, useRef, useState } from "react";
import { ArchLogo } from "./Primitives";
import { savePreference } from "./config";
const lines = [
  "ArchNemesis // boot sequence",
  "",
  "> kernel ................. [ ONLINE ]",
  "> compositor ............. [ HYPRLAND ]",
  "> shell .................. [ ZSH ]",
  "> network ................ [ CONNECTED ]",
  "> github ................. [ MOUNTED ]",
  "> projects ............... [ INDEXED ]",
  "> portfolio .............. [ READY ]",
  "> rice ................... [ MAXIMUM ]",
  "",
  "> launching portfolio...",
];
const script = lines.join("\n");
export default function BootSequence({ onComplete }) {
  const [count, setCount] = useState(0);
  const [launch, setLaunch] = useState(false);
  const skip = useRef(null);
  useEffect(() => {
    skip.current?.focus();
    let timer;
    let index = 0;
    function finish() {
      savePreference("arch:booted", "1", true);
      onComplete();
    }
    function type() {
      index++;
      setCount(index);
      if (index < script.length)
        timer = setTimeout(
          type,
          script[index] === "["
            ? 100
            : script[index] === "\n"
              ? 100
              : 3 + Math.random() * 8,
        );
      else {
        setLaunch(true);
        timer = setTimeout(finish, 1100);
      }
    }
    timer = setTimeout(type, 250);
    return () => clearTimeout(timer);
  }, [onComplete]);
  return (
    <div
      className={`boot-screen ${launch ? "boot-launch" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="ArchNemesis boot sequence"
    >
      <div className="boot-terminal">
        <span className="boot-caption">ARCHNEMESIS / INITIALIZING SESSION</span>
        <pre aria-hidden="true">
          {script.slice(0, count)}
          <span className="block-cursor">▌</span>
        </pre>
        <div className="boot-progress">
          <span style={{ transform: `scaleX(${count / script.length})` }} />
        </div>
        <div className="boot-foot">
          <span>
            mounting your little corner of the internet
            <span className="loading-dots">...</span>
          </span>
          <span>{Math.round((count / script.length) * 100)}%</span>
        </div>
      </div>
      <div className="boot-emblem">
        <i />
        <i />
        <ArchLogo />
      </div>
      <button
        ref={skip}
        className="boot-skip"
        onClick={() => {
          savePreference("arch:booted", "1", true);
          onComplete();
        }}
      >
        SKIP BOOT <span>↵</span>
      </button>
    </div>
  );
}
