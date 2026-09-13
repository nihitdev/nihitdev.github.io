import { ArrowDown, ArrowUpRight, GitBranch, Terminal } from "lucide-react";
import GitHubIcon from "./GitHubIcon";

export default function Hero() {
  return (
    <section id="home" className="hero shell">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="availability">
            <span className="dot" /> BUILDING IN PUBLIC{" "}
            <span className="location">/ INDIA</span>
          </p>
          <h1>
            Nihit
            <br />
            <span>
              Sunhare<span className="name-period">.</span>
            </span>
          </h1>
          <h2>Small tools. Better workflows.</h2>
          <p className="lead">
            Developer. Linux enthusiast. Terminal person.
            <br />I build useful things and obsess over the little details that
            make them feel right.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#projects">
              View projects <ArrowDown size={16} />
            </a>
            <a
              className="button secondary"
              href="https://github.com/nihitdev"
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon size={17} /> GitHub <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div
          className="hero-visual"
          role="img"
          aria-label="An illustrated terminal showing Nihit's developer environment"
        >
          <div className="orbit orbit-one" aria-hidden="true" />
          <div className="orbit orbit-two" aria-hidden="true" />
          <span className="visual-coordinate" aria-hidden="true">
            ~/ a place to build
          </span>
          <div className="terminal-card">
            <div className="terminal-bar">
              <div className="traffic" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <span>nihit@arch: ~</span>
              <Terminal size={13} />
            </div>
            <div className="terminal-body">
              <p>
                <b>❯</b> whoami
              </p>
              <div className="terminal-identity">
                <span className="ascii-mark" aria-hidden="true">
                  n<span>_</span>
                </span>
                <div>
                  <strong>nihitdev</strong>
                  <br />
                  <span>--------------------</span>
                  <br />
                  developer & tinkerer
                </div>
              </div>
              <dl>
                <div>
                  <dt>os</dt>
                  <dd>Arch Linux</dd>
                </div>
                <div>
                  <dt>shell</dt>
                  <dd>Fish + Zsh</dd>
                </div>
                <div>
                  <dt>editor</dt>
                  <dd>Neovim</dd>
                </div>
                <div>
                  <dt>focus</dt>
                  <dd>tools that feel personal</dd>
                </div>
              </dl>
              <div className="terminal-palette" aria-hidden="true">
                {[
                  "#91a5e8",
                  "#aab7e8",
                  "#d1b27c",
                  "#b5b4cd",
                  "#8ba9ba",
                  "#d3a79b",
                  "#ecece1",
                ].map((c) => (
                  <i key={c} style={{ background: c }} />
                ))}
              </div>
              <p className="terminal-prompt">
                <b>❯</b> make something useful<span className="cursor">▍</span>
              </p>
            </div>
            <div className="terminal-footer">
              <span>
                <GitBranch size={12} /> main
              </span>
              <span>
                <span className="dot" /> still cooking
              </span>
            </div>
          </div>
          <div className="visual-note">
            <span>✦</span> A little curiosity. A lot of terminal tabs.
          </div>
        </div>
      </div>
      <div className="hero-bottom">
        <p>
          <span className="dot" /> Building with{" "}
          <strong>Rust · TypeScript · Go · JavaScript · Linux</strong>
        </p>
        <a href="#about">
          SCROLL TO EXPLORE <ArrowDown size={13} />
        </a>
      </div>
    </section>
  );
}
