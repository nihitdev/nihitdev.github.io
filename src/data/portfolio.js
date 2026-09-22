export const workspaces = [
  {
    id: "home",
    label: "HOME",
    title: "Home",
    description: "Back to the introduction",
    keywords: "identity whoami",
  },
  {
    id: "about",
    label: "ABOUT",
    title: "About Nihit",
    description: "The person behind the configs",
    keywords: "bio identity",
  },
  {
    id: "projects",
    label: "PROJECTS",
    title: "All projects",
    description: "Explore the workbench",
    keywords: "repositories work",
  },
  {
    id: "toolbox",
    label: "STACK",
    title: "Technology stack",
    description: "Tools I reach for",
    keywords: "skills languages",
  },
  {
    id: "terminal",
    title: "Interactive terminal",
    description: "Open a shell. Try help or neofetch.",
    keywords: "commands cli shell",
  },
  {
    id: "now",
    label: "GITHUB",
    title: "GitHub & activity",
    description: "Built in the open",
    keywords: "source current",
  },
  {
    id: "contact",
    label: "CONTACT",
    title: "Get in touch",
    description: "Email, Discord, and discussions",
    keywords: "email discord hello",
  },
];

export const toolbox = [
  {
    title: "Programming languages",
    items: ["Rust", "Go", "JavaScript", "TypeScript", "Lua", "Python"],
  },
  {
    title: "Shells",
    items: [
      "Fish",
      "Zsh",
      "Bash",
      "Windows PowerShell 5.1",
      "PowerShell (pwsh)",
    ],
  },
  {
    title: "Formats & styling",
    items: ["YAML", "TOML", "JSON", "XML", "Markdown", "CSS"],
  },
  {
    title: "Systems",
    items: [
      "Arch Linux",
      "Linux",
      "Windows",
      "WSL",
      "Niri",
      "Hyprland",
      "Wayland",
    ],
  },
  {
    title: "Tools",
    items: [
      "VS Code",
      "JetBrains",
      "Vim",
      "Neovim",
      "Kitty",
      "Starship",
      "tmux",
      "fzf",
      "ripgrep",
      "jq",
      "Node.js",
      "Bun",
      "SSH",
      "Git",
      "GitHub",
      "GitHub Actions",
      "Podman",
    ],
  },
  {
    title: "Package managers",
    items: [
      "Scoop",
      "Winget",
      "Chocolatey",
      "Pacman",
      "APT",
      "npm",
      "pnpm",
      "Cargo",
    ],
  },
];

export const projects = [
  {
    title: "kairo",
    description:
      "A personal terminal, shell, prompt, editor, theme, and desktop configuration system.",
    tags: ["Dotfiles", "Fish", "Zsh", "CSS"],
    href: "https://github.com/nihitdev/kairo",
  },
  {
    title: "kairo-shell",
    description:
      "A focused shell environment built around fast prompts, useful aliases, and a calmer command-line workflow.",
    tags: ["Shell", "Fish", "Zsh", "CLI"],
    href: "https://github.com/nihitdev/kairo-shell",
  },
  {
    title: "shellcord",
    description:
      "A shell-inspired Discord theme with modular customization, Catppuccin colors, and terminal aesthetics.",
    tags: ["CSS", "Discord", "Catppuccin"],
    href: "https://github.com/nihitdev/shellcord",
  },
  {
    title: "shell-prompts",
    description:
      "A curated collection of clean shell prompt ideas for Fish, Zsh, Git, Nerd Fonts, and terminal setups.",
    tags: ["Shell", "Fish", "Zsh", "Terminal"],
    href: "https://github.com/nihitdev/shell-prompts",
  },
  {
    title: "terminal-playground",
    description:
      "Tiny interactive terminal demos for ANSI colors, Unicode, spinners, progress bars, gradients, and system info.",
    tags: ["Bash", "ANSI", "Unicode", "CLI"],
    href: "https://github.com/nihitdev/terminal-playground",
  },
  {
    title: "yo-cli",
    description:
      "A small command-line companion for getting useful project workflows started quickly.",
    tags: ["CLI", "Shell", "Developer tools"],
    href: "https://github.com/nihitdev/yo-cli",
  },
  {
    title: "starship-presets",
    description:
      "Minimal Starship presets featuring λ, Ω, ∴, ╰─❯, Catppuccin, and other prompt styles.",
    tags: ["Starship", "TOML", "Prompt"],
    href: "https://github.com/nihitdev/starship-presets",
  },
  {
    title: "nerd-font-glyphs",
    description:
      "A curated Nerd Font glyph collection for prompts, terminals, status bars, file icons, and developer tools.",
    tags: ["Nerd Fonts", "Glyphs", "Terminal"],
    href: "https://github.com/nihitdev/nerd-font-glyphs",
  },
];

export const nowItems = [
  {
    title: "Living in the terminal",
    description:
      "Tuning Fish, Zsh, Starship, Kitty, Neovim, and the tiny details that make a shell feel like home.",
    command: "exec fish",
  },
  {
    title: "Building small useful repos",
    description:
      "Keeping projects focused: one clear purpose, useful docs, manual commits, and tools people can actually run.",
    command: "git status",
  },
  {
    title: "Arch Linux daily driver",
    description:
      "Arch Linux, Hyprland, Niri, modern CLI tools, and a setup that is constantly getting cleaner.",
    command: "sudo pacman -Syu",
  },
];
