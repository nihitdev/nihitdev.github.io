import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CornerDownLeft, Search, X } from "lucide-react";
import { projects, workspaces } from "../data/portfolio";
import "./command-palette.css";

const commands = [
  ...workspaces.map(({ id, title, description, keywords }) => ({
    id,
    title,
    description,
    keywords,
    href: `#${id}`,
    group: "WORKSPACE",
  })),
  ...projects.map((project) => ({
    id: `repo-${project.title}`,
    title: project.title,
    description: project.description,
    keywords: project.tags.join(" "),
    href: project.href,
    group: "REPOSITORY",
    external: true,
  })),
];

export default function CommandPalette() {
  const dialog = useRef(null);
  const input = useRef(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const results = commands.filter((command) => {
    const text =
      `${command.title} ${command.description} ${command.keywords} ${command.group}`.toLowerCase();
    return terms.every((term) => text.includes(term));
  });
  const active = results[selected];

  function openPalette() {
    setQuery("");
    setSelected(0);
    dialog.current.showModal();
    input.current.focus();
  }

  useEffect(() => {
    const shortcut = (event) => {
      if (
        !(event.ctrlKey || event.metaKey) ||
        event.altKey ||
        event.key.toLowerCase() !== "k" ||
        event.repeat
      )
        return;
      if (document.querySelector(".desktop-session[inert]")) return;
      if (dialog.current.open) {
        event.preventDefault();
        dialog.current.close();
      } else if (!document.querySelector("dialog[open]")) {
        event.preventDefault();
        openPalette();
      }
    };
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, []);

  function navigate(event) {
    if (event.nativeEvent.isComposing) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!results.length) return;
      const next =
        (selected + (event.key === "ArrowDown" ? 1 : -1) + results.length) %
        results.length;
      setSelected(next);
      document
        .getElementById(`command-${results[next].id}`)
        ?.scrollIntoView({ block: "nearest" });
    } else if (event.key === "Enter" && active) {
      event.preventDefault();
      document.getElementById(`command-${active.id}`)?.click();
    }
  }

  return (
    <>
      <button
        className="command-trigger"
        onClick={openPalette}
        aria-label="Open command palette"
        aria-haspopup="dialog"
        aria-keyshortcuts="Control+k Meta+k"
      >
        <Search size={13} />
        <span>SEARCH</span>
        <kbd>⌘ / Ctrl K</kbd>
      </button>
      <dialog
        ref={dialog}
        className="command-palette"
        aria-labelledby="command-title"
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current.close();
        }}
      >
        <div className="command-panel">
          <div className="command-titlebar">
            <span id="command-title">Search the portfolio</span>
            <button
              onClick={() => dialog.current.close()}
              aria-label="Close command palette"
            >
              <X size={17} />
            </button>
          </div>
          <div className="command-search">
            <span aria-hidden="true">❯</span>
            <input
              ref={input}
              type="text"
              role="combobox"
              aria-label="Search sections and projects"
              aria-autocomplete="list"
              aria-expanded="true"
              aria-controls="command-results"
              aria-activedescendant={
                active ? `command-${active.id}` : undefined
              }
              placeholder="Where do you want to go?"
              autoComplete="off"
              spellCheck={false}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setSelected(0);
              }}
              onKeyDown={navigate}
            />
            <Search size={17} aria-hidden="true" />
          </div>
          <div
            className="command-results"
            id="command-results"
            role="listbox"
            aria-label="Sections and repositories"
          >
            {results.map((command, index) => (
              <a
                key={command.id}
                id={`command-${command.id}`}
                role="option"
                aria-selected={selected === index}
                tabIndex={-1}
                href={command.href}
                target={command.external ? "_blank" : undefined}
                rel={command.external ? "noreferrer" : undefined}
                className="command-result"
                onClick={() => dialog.current.close()}
              >
                <span className="command-symbol" aria-hidden="true">
                  {command.external ? "~/" : String(index + 1).padStart(2, "0")}
                </span>
                <span className="command-copy">
                  <strong>{command.title}</strong>
                  <span>{command.description}</span>
                </span>
                <span className="command-kind">{command.group}</span>
                {command.external ? (
                  <ArrowUpRight size={15} aria-label="Opens in a new tab" />
                ) : (
                  <CornerDownLeft size={15} aria-hidden="true" />
                )}
              </a>
            ))}
          </div>
          {!results.length && (
            <div className="command-empty">
              <span>
                command not found<span className="block-cursor">_</span>
              </span>
              <p>Try “terminal”, “contact”, or a project name.</p>
            </div>
          )}
          <div className="command-footer">
            <span>
              <kbd>↑</kbd>
              <kbd>↓</kbd> navigate <kbd>↵</kbd> open <kbd>esc</kbd> close
            </span>
            <span role="status" aria-live="polite">
              {results.length} {results.length === 1 ? "result" : "results"}
            </span>
          </div>
        </div>
      </dialog>
    </>
  );
}
