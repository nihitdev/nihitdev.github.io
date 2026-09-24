import Telemetry from "../motion/Telemetry";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight, GitBranch, Terminal } from "lucide-react";
import GitHubIcon from "./GitHubIcon";
import {
  ArchLogo,
  GlitchText,
  DraggableWindow,
  MagneticButton,
  TerminalText,
  WindowBar,
} from "../motion/Primitives";
import { overdrive } from "../motion/config";
export default function Hero({ ready = true }) {
  const clicks = useRef(0);
  return (
    <section id="home" className="hero shell">
      <div className="hero-topline">
        <span>~/home/nihitdev/portfolio</span>
        <span>
          WORKSPACE 01 <span className="accent">●</span>
        </span>
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="availability">
            <i className="status-dot" /> BUILDING IN PUBLIC <span>/ INDIA</span>
          </p>
          <div className="hero-prompt">
            <span>
              nihitdev<span className="accent">@ArchNemesis</span>:~$
            </span>
            <TerminalText text="whoami" delay={500} active={ready} />
          </div>
          <h1 aria-label="Nihit Sunhare">
            <span className="name-line" aria-hidden="true">
              {"NIHIT".split("").map((letter, i) => (
                <span style={{ "--i": i }} key={i}>
                  {letter}
                </span>
              ))}
              <span className="name-dot">.</span>
            </span>
            <span className="surname">
              <GlitchText>SUNHARE</GlitchText>
              <span className="name-caret">_</span>
            </span>
          </h1>
          <h2>
            Developer. Linux enthusiast. <span>Builder.</span>
          </h2>
          <p className="lead">
            Small tools. Better workflows.
            <br />I build useful things and obsess over the little details that
            make them feel right.
          </p>
          <div className="hero-actions">
            <MagneticButton href="#projects" className="primary">
              <span>&gt;_</span> Explore projects <ArrowUpRight size={17} />
            </MagneticButton>
            <MagneticButton
              href="https://github.com/nihitdev"
              target="_blank"
              rel="noreferrer"
              className="secondary"
            >
              <GitHubIcon size={16} /> GitHub <ArrowUpRight size={15} />
            </MagneticButton>
          </div>
          <div className="hero-tags">
            <span>ARCH LINUX</span>
            <i>/</i>
            <span>OPEN SOURCE</span>
            <i>/</i>
            <span>ENDLESS CURIOSITY</span>
          </div>
        </div>
        <div className="hero-visual">
          <Telemetry />
          <div className="orbital orbital-outer" aria-hidden="true" />
          <div className="orbital orbital-inner" aria-hidden="true" />
          <span className="visual-coordinate">
            DISPLAY :0 · 256 COLORS · ∞ POSSIBILITIES
          </span>
          <div className="hero-terminal tilt-card" data-tilt>
            <WindowBar title="nihitdev@ArchNemesis: ~" detail="01 — neofetch" />
            <div className="neofetch">
              <div className="neofetch-command">
                <span>❯</span> neofetch{" "}
                <span className="command-comment">--personality</span>
              </div>
              <div className="neofetch-main">
                <button
                  className="arch-emblem"
                  aria-label="Arch Linux emblem; click five times for rice overdrive"
                  onClick={() => {
                    clicks.current++;
                    if (clicks.current % 5 === 0) overdrive();
                  }}
                >
                  <ArchLogo />
                  <span className="emblem-ring" />
                </button>
                <div className="system-info">
                  <strong>
                    nihitdev<span>@</span>ArchNemesis
                  </strong>
                  <div className="ascii-rule">----------------------</div>
                  {[
                    ["OS", "Arch Linux x86_64"],
                    ["WM", "Hyprland / Niri"],
                    ["SHELL", "Zsh / Fish"],
                    ["EDITOR", "Neovim"],
                    ["STATUS", "ONLINE"],
                    ["RICE", "MAXIMUM"],
                  ].map(([key, value], i) => (
                    <div className="meta-row" key={key} style={{ "--i": i }}>
                      <span>{key}</span>
                      <b className={key === "STATUS" ? "success" : ""}>
                        {value}
                      </b>
                    </div>
                  ))}
                </div>
              </div>
              <div className="terminal-palette">
                {[
                  "#b4befe",
                  "#cba6f7",
                  "#f5c2e7",
                  "#f38ba8",
                  "#89dceb",
                  "#a6e3a1",
                  "#f9e2af",
                  "#cdd6f4",
                ].map((c, i) => (
                  <i key={c} style={{ background: c, "--i": i }} />
                ))}
              </div>
              <div className="hero-terminal-rule" />
              <div className="terminal-quote">
                <span>❯</span> echo $PHILOSOPHY
                <p>
                  "Make the machine feel like <b>home.</b>"
                </p>
              </div>
              <a href="#terminal" className="terminal-invite">
                ❯ enter interactive shell{" "}
                <span className="block-cursor">▌</span>
                <span>↵</span>
              </a>
            </div>
            <div className="window-footer">
              <span>
                <GitBranch size={12} /> main*
              </span>
              <span>
                <i className="status-dot" /> session active
              </span>
              <span>utf-8</span>
            </div>
          </div>
          <DraggableWindow title="~/.config/hypr/identity.conf">
            <div className="config-note">
              <span>$</span>
              <div>
                personality = <b>100%</b>
                <br />
                rice = <b>maximum</b>
                <br />
                <span className="comment">
                  # it's not a phase, it's a workflow
                </span>
              </div>
            </div>
          </DraggableWindow>
          <span className="visual-bottom">
            <Terminal size={12} /> HANDCRAFTED. NOT DEFAULT.
          </span>
        </div>
      </div>
      <div className="hero-bottom">
        <a href="#about">
          <ArrowDown size={14} />
          <span>
            scroll to continue<span className="block-cursor">_</span>
          </span>
        </a>
        <p>
          BUILT WITH{" "}
          <strong>
            Rust <i>·</i> TypeScript <i>·</i> Go <i>·</i> Linux
          </strong>
        </p>
        <span className="hero-version">
          PORTFOLIO.SYS <b>v2.0</b>
        </span>
      </div>
    </section>
  );
}
