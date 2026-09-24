import { useEffect, useRef, useState } from "react";
import { projects, toolbox } from "../data/portfolio";
import { WindowBar } from "../motion/Primitives";
import { overdrive } from "../motion/config";
const commands = [
  "help",
  "about",
  "projects",
  "skills",
  "github",
  "contact",
  "clear",
  "neofetch",
  "whoami",
  "ls",
  "cat about.txt",
  "uname -a",
  "pwd",
  "history",
  "rice",
  "matrix",
];
const intro =
  "ArchNemesis interactive shell\nA small window into my world. Type help to explore.";
export default function InteractiveTerminal() {
  const [value, setValue] = useState("");
  const [entries, setEntries] = useState([{ text: intro }]);
  const history = useRef([]);
  const index = useRef(0);
  const output = useRef(null);
  const input = useRef(null);
  useEffect(() => {
    output.current.scrollTop = output.current.scrollHeight;
  }, [entries]);
  function execute(raw) {
    const command = raw.trim();
    if (!command) return;
    history.current = [...history.current, command].slice(-100);
    index.current = history.current.length;
    setValue("");
    if (command === "clear") {
      setEntries([]);
      return;
    }
    let text;
    switch (command.toLowerCase()) {
      case "help":
        text = `${commands.join("  ·  ")}\nTip: ↑ ↓ history · Tab autocomplete · try sudo pacman -S rice`;
        break;
      case "about":
      case "cat about.txt":
        text =
          "I'm Nihit Sunhare, a developer in India building small tools, Linux utilities, terminal experiments, and dotfiles that feel like home.";
        break;
      case "whoami":
        text =
          "Nihit Sunhare / nihitdev\nDeveloper. Linux enthusiast. Builder.";
        break;
      case "projects":
        text = projects
          .map((p) => `${p.title}\n  ${p.description}\n  ${p.href}`)
          .join("\n\n");
        break;
      case "skills":
        text = toolbox
          .map((g) => `${g.title}: ${[...new Set(g.items)].join(", ")}`)
          .join("\n");
        break;
      case "github":
        text =
          "Source is open. Curiosity is welcome.\nhttps://github.com/nihitdev";
        break;
      case "contact":
        text =
          "Email: hello@nihit.is-a.dev\nCode: code.nihit.dev@gmail.com\nDiscord: nihitdev\nhttps://github.com/nihitdev/chat/discussions";
        break;
      case "neofetch":
        text =
          "        /\\          nihitdev@ArchNemesis\n       /  \\         ----------------\n      / /\\ \\        OS     Arch Linux\n     / /  \\ \\       WM     Hyprland / Niri\n    /_/    \\_\\      Shell  Zsh / Fish\n                     Editor Neovim\n                     Rice   MAXIMUM";
        break;
      case "ls":
        text = "about.txt  projects/  skills/  github/  contact.txt  rice.conf";
        break;
      case "pwd":
        text = "/home/nihitdev/portfolio";
        break;
      case "uname -a":
        text =
          "ArchNemesis portfolio 2.0 · browser · simulated zsh · built on Linux";
        break;
      case "history":
        text = history.current
          .map((c, i) => `${String(i + 1).padStart(3)}  ${c}`)
          .join("\n");
        break;
      case "rice":
      case "sudo pacman -s rice":
        text =
          "resolving dependencies...\ninstalling maximum-rice...\n:: rice successfully installed\nrice :: MAXIMUM [ LOADED ]";
        overdrive();
        break;
      case "matrix":
        text = "Follow the white rabbit. Visual stream enabled for 6 seconds.";
        overdrive();
        break;
      case "rm -rf /":
        text = "permission denied: nice try 💀";
        break;
      default:
        text = `zsh: command not found: ${command}\nType help for the available portfolio commands.`;
    }
    setEntries((prev) => [...prev, { command, text }].slice(-40));
  }
  return (
    <>
      <div className="section-head">
        <p className="eyebrow">
          <span>04</span> / YOUR TURN AT THE KEYBOARD
        </p>
        <div className="heading-row">
          <h2>
            Less clicking.
            <br />
            <span>More commanding.</span>
          </h2>
          <p>
            This terminal is yours.
            <br />
            Go ahead. Break absolutely nothing.
          </p>
        </div>
      </div>
      <div className="interactive-terminal">
        <WindowBar
          title="nihitdev@ArchNemesis: ~/portfolio"
          detail="interactive shell"
        />
        <div
          className="terminal-output"
          ref={output}
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          tabIndex={0}
          aria-label="Terminal output"
        >
          {entries.map((entry, i) => (
            <div
              className="output-entry"
              key={`${i}-${entry.command || "intro"}`}
            >
              {entry.command && (
                <div className="entered-command">
                  <span>nihitdev@ArchNemesis:~$</span> {entry.command}
                </div>
              )}
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
            </div>
          ))}
        </div>
        <form
          className="terminal-input"
          onSubmit={(e) => {
            e.preventDefault();
            execute(value);
          }}
        >
          <label htmlFor="shell-command">
            nihitdev<span>@ArchNemesis</span>:~$
          </label>
          <input
            id="shell-command"
            ref={input}
            aria-label="Terminal command"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            autoCapitalize="none"
            placeholder="type help..."
            onKeyDown={(e) => {
              if (e.key === "ArrowUp") {
                e.preventDefault();
                index.current = Math.max(0, index.current - 1);
                setValue(history.current[index.current] || "");
              }
              if (e.key === "ArrowDown") {
                e.preventDefault();
                index.current = Math.min(
                  history.current.length,
                  index.current + 1,
                );
                setValue(history.current[index.current] || "");
              }
              if (e.key === "Tab" && value) {
                const matches = commands.filter((c) => c.startsWith(value));
                if (matches.length === 1) {
                  e.preventDefault();
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
          {["help", "neofetch", "projects", "rice", "clear"].map((c) => (
            <button
              key={c}
              data-command
              onClick={() => {
                execute(c);
                input.current.focus({ preventScroll: true });
              }}
            >
              {c}
              <span>↵</span>
            </button>
          ))}
          <span>SIMULATED SHELL · SAFE TO EXPLORE</span>
        </div>
      </div>
    </>
  );
}
