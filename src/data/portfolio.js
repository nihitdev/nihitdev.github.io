export const navItems = [
  { label: "About", href: "#about" },
  { label: "Toolbox", href: "#toolbox" },
  { label: "Projects", href: "#projects" },
  { label: "Now", href: "#now" },
  { label: "Contact", href: "#contact" },
];

export const toolbox = [
  {
    title: "Programming languages",
    items: ["Rust", "Go", "JavaScript", "TypeScript", "Lua", "Python"],
  },
  {
    title: "Shells",
    items: ["Zsh", "Fish", "Bash", "Nushell", "Windows PowerShell 5.1", "PowerShell (pwsh)"],
  },
  {
    title: "Formats & styling",
    items: ["YAML", "TOML", "JSON", "XML", "Markdown", "CSS"],
  },
  {
    title: "Systems",
    items: ["Arch Linux", "Linux", "Hyprland", "Wayland", "Windows", "WSL"],
  },
  {
    title: "Tools",
    items: ["VS Code", "JetBrains", "Vim", "Neovim", "Kitty", "Starship", "tmux", "fzf", "ripgrep", "jq", "Node.js", "Bun", "SSH", "Git", "GitHub", "GitHub Actions", "Podman", "Docker"],
  },
  {
    title: "Package managers",
    items: ["Scoop", "Winget", "Chocolatey", "Pacman", "APT", "npm", "pnpm", "Cargo"],
  },
];

export const projects = [
  {
    title: "Kairo",
    description: "My Arch Linux workstation installer and dotfiles ecosystem for a custom Hyprland desktop and CLI workflow.",
    tags: ["Arch Linux", "Hyprland", "Dotfiles", "Zsh"],
    href: "https://github.com/nihitdev/kairo",
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
    description: "Tuning Zsh, Starship, Kitty, Hyprland, Neovim, and the tiny details that make Linux feel like home.",
    command: "exec zsh",
  },
  {
    title: "Building small useful repos",
    description: "Keeping projects focused: one clear purpose, useful docs, manual commits, and tools people can actually run.",
    command: "git status",
  },
  {
    title: "Arch Linux daily driver",
    description: "Arch Linux, Hyprland, Wayland, modern CLI tools, and Podman containers in a custom desktop and shell setup that keeps getting cleaner.",
    command: "sudo pacman -Syu",
  },
];
