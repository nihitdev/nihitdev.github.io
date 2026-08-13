export const navItems = [
  { label: "About", href: "#about" },
  { label: "Toolbox", href: "#toolbox" },
  { label: "Projects", href: "#projects" },
  { label: "Now", href: "#now" },
  { label: "Contact", href: "#contact" },
];

export const toolbox = [
  "Rust", "Go", "JavaScript", "TypeScript",
  "YAML", "TOML", "CSS",
  "CachyOS", "Arch Linux", "Linux", "KDE Plasma",
  "Fish", "Zsh", "Bash", "Konsole", "Starship",
  "Neovim", "Git", "GitHub", "GitHub Actions", "Docker",
];

export const projects = [
  {
    title: "dotfiles",
    description: "My current terminal, shell, prompt, editor, theme, and desktop configuration collection.",
    tags: ["Dotfiles", "Fish", "Zsh", "CSS"],
    href: "https://github.com/nihitdev/dotfiles",
  },
  {
    title: "shellcord",
    description: "A shell-inspired Discord theme with modular customization, Catppuccin colors, and terminal aesthetics.",
    tags: ["CSS", "Discord", "Catppuccin"],
    href: "https://github.com/nihitdev/shellcord",
  },
  {
    title: "arch-after-install",
    description: "A practical post-install checklist for Arch Linux and CachyOS, with a small system-check utility.",
    tags: ["Arch Linux", "CachyOS", "KDE"],
    href: "https://github.com/nihitdev/arch-after-install",
  },
  {
    title: "shell-prompts",
    description: "A curated collection of clean shell prompt ideas for Fish, Zsh, Git, Nerd Fonts, and terminal setups.",
    tags: ["Shell", "Fish", "Zsh", "Terminal"],
    href: "https://github.com/nihitdev/shell-prompts",
  },
  {
    title: "terminal-playground",
    description: "Tiny interactive terminal demos for ANSI colors, Unicode, spinners, progress bars, gradients, and system info.",
    tags: ["Bash", "ANSI", "Unicode", "CLI"],
    href: "https://github.com/nihitdev/terminal-playground",
  },
  {
    title: "linux-one-liners",
    description: "Useful Linux one-liners grouped by files, processes, networking, disks, permissions, packages, text, and system.",
    tags: ["Linux", "Shell", "Reference"],
    href: "https://github.com/nihitdev/linux-one-liners",
  },
  {
    title: "starship-presets",
    description: "Minimal Starship presets featuring λ, Ω, ∴, ╰─❯, Catppuccin, and other prompt styles.",
    tags: ["Starship", "TOML", "Prompt"],
    href: "https://github.com/nihitdev/starship-presets",
  },
  {
    title: "nerd-font-glyphs",
    description: "A curated Nerd Font glyph collection for prompts, terminals, status bars, file icons, and developer tools.",
    tags: ["Nerd Fonts", "Glyphs", "Terminal"],
    href: "https://github.com/nihitdev/nerd-font-glyphs",
  },
];

export const nowItems = [
  {
    title: "Living in the terminal",
    description: "Tuning Fish, Zsh, Starship, Konsole, Neovim, and the tiny details that make a shell feel like home.",
    command: "exec fish",
  },
  {
    title: "Building small useful repos",
    description: "Keeping projects focused: one clear purpose, useful docs, manual commits, and tools people can actually run.",
    command: "git status",
  },
  {
    title: "CachyOS daily driver",
    description: "Arch-based Linux, KDE Plasma, modern CLI tools, and a setup that is constantly getting cleaner.",
    command: "sudo pacman -Syu",
  },
];
