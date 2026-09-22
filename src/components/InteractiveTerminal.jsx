import { useEffect, useRef, useState } from "react";
import { completeCommand, displayPath, HOME, runCommand } from "../lib/shell";
export default function InteractiveTerminal() {
  const [value, setValue] = useState("");
  const [shell, setShell] = useState({ cwd: HOME, previous: HOME });
  const [entries, setEntries] = useState([
    {
      text: "Welcome to my little corner of the terminal.\nType help to explore.",
    },
  ]);
  const history = useRef([]);
  const index = useRef(0);
  const draft = useRef("");
  const input = useRef(null);
  const output = useRef(null);
  useEffect(() => {
    output.current.scrollTop = output.current.scrollHeight;
  }, [entries]);
  function execute(raw) {
    const command = raw.trim();
    if (!command) return;
    history.current = [...history.current, command].slice(-100);
    index.current = history.current.length;
    const result = runCommand(command, { ...shell, history: history.current });
    setShell({ cwd: result.cwd, previous: result.previous });
    setEntries((prev) =>
      result.clear
        ? []
        : [...prev, { command, cwd: shell.cwd, text: result.text }].slice(-40),
    );
    setValue("");
    draft.current = "";
  }
  return (
    <div className="interactive-terminal">
      <div className="terminal-title">
        <span>nihitdev@ArchNemesis</span>
        <span>portfolio shell</span>
      </div>
      <div
        ref={output}
        className="terminal-output"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        tabIndex={0}
        aria-label="Terminal output"
      >
        {entries.map((entry, i) => (
          <div className="output-entry" key={i}>
            {entry.command && (
              <div className="entered-command">
                <span>{displayPath(entry.cwd)} $</span> {entry.command}
              </div>
            )}
            {entry.text && (
              <pre>
                {entry.text.split(/(https:\/\/[^\s]+)/g).map((part, j) =>
                  part.startsWith("https://") ? (
                    <a href={part} key={j} target="_blank" rel="noreferrer">
                      {part} ↗
                    </a>
                  ) : (
                    part
                  ),
                )}
              </pre>
            )}
          </div>
        ))}
      </div>
      <form
        className="terminal-input"
        onSubmit={(event) => {
          event.preventDefault();
          execute(value);
        }}
      >
        <label htmlFor="shell-command">{displayPath(shell.cwd)} $</label>
        <input
          id="shell-command"
          ref={input}
          aria-label="Terminal command"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          autoComplete="off"
          spellCheck={false}
          autoCapitalize="none"
          placeholder="type help"
          onKeyDown={(event) => {
            if (event.nativeEvent.isComposing) return;
            if (event.ctrlKey && event.key.toLowerCase() === "l") {
              event.preventDefault();
              setEntries([]);
            }
            if (event.ctrlKey && event.key.toLowerCase() === "c") {
              event.preventDefault();
              setValue("");
            }
            if (event.key === "ArrowUp" || event.key === "ArrowDown") {
              event.preventDefault();
              if (index.current === history.current.length)
                draft.current = value;
              index.current = Math.max(
                0,
                Math.min(
                  history.current.length,
                  index.current + (event.key === "ArrowUp" ? -1 : 1),
                ),
              );
              setValue(
                index.current === history.current.length
                  ? draft.current
                  : history.current[index.current] || "",
              );
            }
            if (event.key === "Tab" && value && !event.shiftKey) {
              const matches = completeCommand(value, shell.cwd);
              if (matches.length === 1) {
                event.preventDefault();
                setValue(matches[0]);
              }
            }
          }}
        />
        <button type="submit" aria-label="Run command">
          ↵
        </button>
      </form>
      <div className="terminal-shortcuts">
        {["help", "cd projects", "neofetch", "clear"].map((command) => (
          <button
            key={command}
            onClick={() => {
              execute(command);
              input.current.focus({ preventScroll: true });
            }}
          >
            {command}
          </button>
        ))}
        <span>↑ ↓ history · Tab complete</span>
      </div>
    </div>
  );
}
