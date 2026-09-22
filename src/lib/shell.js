import { projects, toolbox } from "../data/portfolio.js";
export const HOME = "/home/nihitdev/portfolio";
const about =
  "I'm Nihit Sunhare, a developer in India building small tools, Linux utilities, terminal experiments, and dotfiles that feel like home.";
const contact =
  "Email: hello@nihit.is-a.dev\nCode: code.nihit.dev@gmail.com\nDiscord: nihitdev\nhttps://github.com/nihitdev/chat/discussions";
const skills = toolbox
  .map((group) => `${group.title}: ${group.items.join(", ")}`)
  .join("\n");
const projectText = (project) =>
  `${project.title}\n${project.description}\n${project.href}`;
const files = {
  [`${HOME}/about.txt`]: about,
  [`${HOME}/contact.txt`]: contact,
  [`${HOME}/rice.conf`]:
    "philosophy = make the machine feel like home\neffects = minimal",
  [`${HOME}/skills/README.md`]: skills,
  [`${HOME}/github/README.md`]:
    "Source is open. Curiosity is welcome.\nhttps://github.com/nihitdev",
  ...Object.fromEntries(
    projects.map((project) => [
      `${HOME}/projects/${project.title}/README.md`,
      projectText(project),
    ]),
  ),
};
const directories = new Set([
  HOME,
  `${HOME}/projects`,
  `${HOME}/skills`,
  `${HOME}/github`,
  ...projects.map((p) => `${HOME}/projects/${p.title}`),
]);
export const commands = [
  "help",
  "cd",
  "ls",
  "pwd",
  "cat",
  "about",
  "projects",
  "skills",
  "github",
  "contact",
  "clear",
  "neofetch",
  "whoami",
  "uname -a",
  "history",
  "rice",
  "matrix",
];
export function resolvePath(path, cwd = HOME) {
  const absolute =
    path === "~"
      ? HOME
      : path.startsWith("~/")
        ? HOME + path.slice(1)
        : path.startsWith("/")
          ? path
          : `${cwd}/${path}`;
  const parts = [];
  for (const part of absolute.split("/")) {
    if (part === "..") parts.pop();
    else if (part && part !== ".") parts.push(part);
  }
  return "/" + parts.join("/");
}
export function displayPath(cwd) {
  return cwd === HOME || cwd.startsWith(HOME + "/")
    ? "~" + cwd.slice(HOME.length)
    : cwd;
}
function children(path) {
  return [...directories, ...Object.keys(files)]
    .filter(
      (entry) =>
        entry.startsWith(path + "/") &&
        !entry.slice(path.length + 1).includes("/"),
    )
    .map(
      (entry) =>
        entry.slice(path.length + 1) + (directories.has(entry) ? "/" : ""),
    );
}
export function completeCommand(value, cwd) {
  if (!value.includes(" "))
    return commands.filter((command) => command.startsWith(value));
  const match = value.match(/^(cd|ls|cat)\s+(.*)$/);
  if (!match) return [];
  const [, command, path] = match;
  const slash = path.lastIndexOf("/");
  const prefix = slash < 0 ? "" : path.slice(0, slash + 1);
  const partial = path.slice(slash + 1);
  return children(resolvePath(prefix || ".", cwd))
    .filter(
      (name) =>
        name.startsWith(partial) && (command !== "cd" || name.endsWith("/")),
    )
    .map((name) => `${command} ${prefix}${name}`);
}
export function runCommand(
  raw,
  { cwd = HOME, previous = HOME, history = [] } = {},
) {
  const tokens = raw.trim().match(/"[^"]*"|'[^']*'|\S+/g) || [];
  const [command, ...args] = tokens.map((token) =>
    token.replace(/^(['"])(.*)\1$/, "$2"),
  );
  const result = { cwd, previous, text: "" };
  const fail = (message) => ({ ...result, text: message });
  switch (command) {
    case undefined:
      return result;
    case "clear":
      return { ...result, clear: true };
    case "help":
      return {
        ...result,
        text: "Explore: cd projects → ls → cd kairo → cat README.md\n\ncd [path]    Change directory; cd .., cd ~, cd - also work\nls [path]    List files and directories\ncat <file>   Read a file\npwd          Print working directory\nhistory      Show command history\nclear        Clear output (also Ctrl+L)\n\nPortfolio: about, projects, skills, github, contact, whoami, neofetch\nExtras: uname -a, rice, matrix\n\n↑ / ↓ history · Tab completes commands and paths\nThis is a simulated portfolio shell, not your computer.",
      };
    case "cd": {
      if (args.length > 1) return fail("cd: too many arguments");
      const path =
        args[0] === "-" ? previous : resolvePath(args[0] || "~", cwd);
      if (!directories.has(path))
        return fail(
          `cd: ${args[0]}: ${files[path] !== undefined ? "not a directory" : "no such directory"}`,
        );
      return { cwd: path, previous: cwd, text: args[0] === "-" ? path : "" };
    }
    case "pwd":
      return { ...result, text: cwd };
    case "ls": {
      const paths = args.filter(
        (arg) => !["-a", "-l", "-la", "-al"].includes(arg),
      );
      return {
        ...result,
        text: (paths.length ? paths : ["."])
          .map((arg) => {
            const path = resolvePath(arg, cwd);
            return directories.has(path)
              ? children(path).join("  ")
              : files[path] !== undefined
                ? arg
                : `ls: ${arg}: no such file or directory`;
          })
          .join("\n"),
      };
    }
    case "cat":
      return {
        ...result,
        text: args.length
          ? args
              .map((arg) => {
                const path = resolvePath(arg, cwd);
                return (
                  files[path] ??
                  `cat: ${arg}: ${directories.has(path) ? "is a directory" : "no such file"}`
                );
              })
              .join("\n")
          : "Usage: cat <file>",
      };
    case "about":
      return { ...result, text: about };
    case "contact":
      return { ...result, text: contact };
    case "skills":
      return { ...result, text: skills };
    case "projects":
      return { ...result, text: projects.map(projectText).join("\n\n") };
    case "github":
      return { ...result, text: files[`${HOME}/github/README.md`] };
    case "whoami":
      return {
        ...result,
        text: "Nihit Sunhare / nihitdev\nDeveloper. Linux enthusiast. Builder.",
      };
    case "neofetch":
      return {
        ...result,
        text: "nihitdev@ArchNemesis\n───────────────────\nOS        Arch Linux\nDesktop   Hyprland / Niri\nShell     Zsh / Fish\nTerminal  Kitty\nEditor    Neovim / Nano\nPrompt    Starship",
      };
    case "uname":
      return {
        ...result,
        text: "ArchNemesis portfolio · browser · simulated shell · built on Linux",
      };
    case "history":
      return {
        ...result,
        text: history.map((item, i) => `${i + 1}  ${item}`).join("\n"),
      };
    case "rice":
      return {
        ...result,
        text: "Make the machine feel like home.\nCurrent recipe: fewer effects, more room to think.",
      };
    case "matrix":
      return {
        ...result,
        text: "Follow the white rabbit.\nThe quiet version: 01001110 01101001 01101000 01101001 01110100",
      };
    case "sudo":
      return {
        ...result,
        text:
          raw.trim() === "sudo pacman -S rice"
            ? ":: minimal-rice is already up to date. Make yourself at home."
            : "sudo: this simulated shell does not run system commands",
      };
    case "rm":
      return fail("rm: permission denied: this portfolio is read-only");
    default:
      return fail(
        `shell: command not found: ${command}\nType help for available commands.`,
      );
  }
}
