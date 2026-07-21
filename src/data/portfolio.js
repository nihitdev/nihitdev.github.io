export const navItems = [
  { label: "About", href: "#about" },
  { label: "Now", href: "#now" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const stats = [
  { value: 10, suffix: "+", label: "Featured projects" },
  { value: 100, suffix: "+", label: "Commits" },
  { value: 24, suffix: "/7", label: "Learning" },
  { value: "∞", suffix: "", label: "Curiosity" },
];

export const languageSkills = [
  { name: "HTML/CSS", level: "Advanced", value: 90 },
  { name: "JavaScript", level: "Advanced", value: 86 },
  { name: "Markdown", level: "Intermediate", value: 72 },
  { name: "Tailwind CSS", level: "Intermediate", value: 76 },
  { name: "Rust", level: "Intermediate", value: 74 },
];

export const toolSkills = [
  { name: "Git & GitHub", level: "Advanced", value: 92 },
  { name: "VS Code", level: "Expert", value: 97 },
  { name: "Ricing", level: "EXPERT", value: 100 },
];

export const projects = [
  {
    number: "01",
    title: "Oxide Terminal",
    subtitle: "Cross-platform terminal emulator",
    description:
      "A low-latency terminal emulator written in Rust with Tokio, PTYs, ANSI input handling, raw terminal control, and a buffered renderer.",
    tags: ["Rust", "Tokio", "PTY", "ANSI"],
    source: "https://github.com/nihitdev/rust_terminal",
    details: "https://github.com/nihitdev/rust_terminal#readme",
    type: "terminal",
  },
  {
    number: "02",
    title: "yoo",
    subtitle: "Tiny developer companion",
    description:
      "A Rust CLI that welcomes you, checks your setup, shows Git status, serves YAML tip packs, and includes a local focus timer.",
    tags: ["Rust", "CLI", "Git", "crates.io"],
    source: "https://github.com/nihitdev/yo-cli",
    details: "https://crates.io/crates/yoo",
    type: "yoo",
  },
  {
    number: "03",
    title: "Ricing Lab",
    subtitle: "A relentlessly customized workspace",
    description:
      "Windows Terminal, PowerShell, Oh My Posh, Fastfetch, Zoxide, modern CLI tools, themes, aliases, and a setup tuned to feel fast and personal.",
    tags: ["PowerShell", "Windows Terminal", "Dotfiles", "UX"],
    source: "https://github.com/nihitdev/dotfiles",
    details: "https://github.com/nihitdev/dotfiles#readme",
    type: "ricing",
  },
];
