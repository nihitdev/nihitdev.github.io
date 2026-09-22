<div align="center">

# ✦ Nihit Sunhare

### Linux · Terminal · Shells · Dotfiles · Developer Tools

[![Live Site](https://img.shields.io/badge/Live_Site-nihit.is--a.dev-7c3aed?style=for-the-badge&logo=googlechrome&logoColor=white)](https://nihit.is-a.dev)
[![GitHub Pages](https://img.shields.io/badge/Deployed_on-GitHub_Pages-222222?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com/)
[![CI](https://github.com/nihitdev/nihitdev.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/nihitdev/nihitdev.github.io/actions/workflows/ci.yml)

</div>

---

## About

A Linux-first personal portfolio centered around terminal tooling, shell configuration, dotfiles, CLI experiments, and small developer utilities.

The site reflects my current setup:

```text
OS        Arch Linux
Shell     Fish / Zsh
Desktop   Hyprland / Niri
Terminal  Kitty
Prompt    Starship
Editor    Neovim / Nano
```

## Featured ecosystem

- `terminal-playground`
- `kairo`
- `kairo-shell`
- `yo-cli`
- `nerd-font-glyphs`
- `shell-snippets`
- `starship-presets`
- `cli-cheatsheets`
- `terminal-colors`
- `prompt-symbols`
- `shell-prompts`
- `shellcord`

## Tech stack

| Category  | Technology                                        |
| --------- | ------------------------------------------------- |
| UI        | React 19                                          |
| Styling   | Tailwind CSS 4 + custom CSS                       |
| Animation | Subtle CSS hover transitions |
| Icons     | Lucide React                                      |
| Tooling   | Vite 8                                            |
| Hosting   | GitHub Pages                                      |

## Run locally

```bash
git clone https://github.com/nihitdev/nihitdev.github.io.git
cd nihitdev.github.io
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm test
```

Every push and pull request runs linting, formatting checks, the production build, regression tests on Node 20 and 22, and a high-severity production dependency audit. Successful pushes to `main` are packaged and deployed to GitHub Pages by the continuous-deployment workflow. Dependabot checks npm packages and GitHub Actions weekly and groups related updates into focused pull requests.

## Design and content

The portfolio uses a minimal text-led layout, comfortable typography, a muted green accent, and light/dark themes. It respects the system color scheme on first visit and saves an explicit theme choice. There are no ambient animations, boot delays, custom cursors, external fonts, or stats requests. Reduced motion disables transitions.

Project descriptions, repository links, and toolbox groups live in `src/data/portfolio.js`. Three projects appear initially; the remaining projects and complete toolbox are available through expandable sections. Every project has a details dialog; optional `demo` URLs are supported there. The original biography, daily driver, current activities, and contact links are retained.

Contact details are in `src/components/Contact.jsx`. Discord copies `nihitdev`, with a visible fallback if clipboard access is unavailable. Search sections and repositories with the header search button or Ctrl/Cmd+K. Alt+1–6 navigation and existing section URLs remain supported.

The simulated terminal supports real directory state: `cd projects`, `ls`, `cd kairo`, `cat README.md`, `cd ..`, `cd ~`, and `cd -`. Arrow keys browse history; Tab completes unambiguous commands and paths. Ctrl+L clears output. No commands execute on the host machine. The command interpreter is in `src/lib/shell.js` and covered by Node regression tests.

`npm test` builds the site and checks startup themes, metadata, workspace identifiers, shell navigation, file reads, errors, and completion. This JavaScript project has no separate typecheck script.

See [design and verification notes](docs/ARCHNEMESIS.md) for architecture and controls.

The favicon and social card are served locally from `public/`. `og-card.svg` is the editable source for the 1200 × 630 PNG used by social metadata.

## Build

```bash
npm run build
npm run preview
```

---

<div align="center">

Built on Linux, probably from Kitty.

**[Visit the portfolio](https://nihit.is-a.dev)** · **[GitHub](https://github.com/nihitdev)**

</div>
