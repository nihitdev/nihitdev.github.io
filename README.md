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
Terminal  Konsole
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
- `kairo`
- `shellcord`

## Tech stack

| Category  | Technology                                        |
| --------- | ------------------------------------------------- |
| UI        | React 19                                          |
| Styling   | Tailwind CSS 4 + custom CSS                       |
| Animation | CSS + shared canvas/RAF + IntersectionObserver |
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

The portfolio is ArchNemesis: a purple-black Linux environment with a cinematic boot, workspace navigation, interactive terminal, tilting project windows, technology constellation, particles, CRT controls, and reduced-motion support. Project descriptions, repository links, and toolbox groups live in `src/data/portfolio.js`. The first two projects receive featured styling; their previews are CSS illustrations, not screenshots. Add a `demo` URL to a featured project to show its live-demo link.

Contact details are in `src/components/Contact.jsx`. Discord copies the username `nihitdev`, with a visible fallback if clipboard access is unavailable. The featured repository count and branch visualization are derived from local project data; no external stats API is used.

The site starts on a dark canvas and renders directly through React, avoiding a flash of static content before the boot sequence. `npm test` builds the site and checks the startup shell, workspace identifiers, and metadata.

See [ArchNemesis implementation and QA notes](docs/ARCHNEMESIS.md) for controls, architecture, performance decisions, and verification.

The favicon and social card are served locally from `public/`. `og-card.svg` is the editable source for the 1200 × 630 PNG used by social metadata.

## Build

```bash
npm run build
npm run preview
```

---

<div align="center">

Built on Linux, probably from Konsole.

**[Visit the portfolio](https://nihit.is-a.dev)** · **[GitHub](https://github.com/nihitdev)**

</div>
