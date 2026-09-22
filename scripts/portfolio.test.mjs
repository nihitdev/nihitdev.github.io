import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { workspaces, projects } from "../src/data/portfolio.js";
import { HOME, runCommand, completeCommand } from "../src/lib/shell.js";
const html = readFileSync(
  new URL("../dist/index.html", import.meta.url),
  "utf8",
);
test("startup applies a stored or system theme before React loads", () => {
  assert.match(html, /<div id="root"><\/div>/);
  assert.match(html, /portfolio:theme/);
  assert.match(html, /prefers-color-scheme: dark/);
  assert.ok(html.indexOf("portfolio:theme") < html.indexOf('<div id="root">'));
  assert.match(html, /<script type="module"[^>]+src="\/assets\//);
});
test("workspace identifiers remain unique with six keyboard shortcuts", () => {
  assert.equal(new Set(workspaces.map(({ id }) => id)).size, workspaces.length);
  assert.equal(workspaces.filter((workspace) => workspace.label).length, 6);
});
test("social metadata preserves identity and current terminal", () => {
  assert.ok(html.includes("Kitty"));
  assert.ok(html.includes("https://nihit.is-a.dev/og-card.png"));
});
test("shell walks projects, reads actual content, and returns home", () => {
  let state = runCommand("cd projects");
  assert.equal(state.cwd, `${HOME}/projects`);
  assert.match(runCommand("ls", state).text, /kairo\//);
  state = runCommand("cd kairo", state);
  assert.equal(runCommand("pwd", state).text, `${HOME}/projects/kairo`);
  assert.ok(runCommand("cat README.md", state).text.includes(projects[0].href));
  state = runCommand("cd ..", state);
  assert.equal(state.cwd, `${HOME}/projects`);
  state = runCommand("cd -", state);
  assert.equal(state.cwd, `${HOME}/projects/kairo`);
  assert.equal(runCommand("cd", state).cwd, HOME);
});
test("shell resolves absolute, quoted, home, and relative paths", () => {
  assert.equal(runCommand(`cd ${HOME}/projects`).cwd, `${HOME}/projects`);
  assert.equal(
    runCommand('cd "~/projects/./kairo/.."').cwd,
    `${HOME}/projects`,
  );
  assert.match(
    runCommand("cat ../about.txt", { cwd: `${HOME}/projects` }).text,
    /Nihit Sunhare/,
  );
  assert.match(runCommand("ls ~/projects").text, /kairo/);
});
test("invalid shell paths report errors without changing directory", () => {
  for (const command of ["cd missing", "cd about.txt", "cd projects kairo"]) {
    const result = runCommand(command);
    assert.equal(result.cwd, HOME);
    assert.match(result.text, /^cd:/);
  }
  assert.match(runCommand("cat projects").text, /is a directory/);
  assert.match(runCommand("cat missing").text, /no such file/);
  assert.match(runCommand("ls missing").text, /no such file/);
  assert.match(runCommand("nope").text, /command not found/);
});
test("completion follows the current directory and command", () => {
  assert.deepEqual(completeCommand("cd pro", HOME), ["cd projects/"]);
  assert.deepEqual(completeCommand("cat RE", `${HOME}/projects/kairo`), [
    "cat README.md",
  ]);
  assert.deepEqual(completeCommand("cd ab", HOME), []);
  assert.deepEqual(completeCommand("who", HOME), ["whoami"]);
});
test("legacy portfolio commands and bounded UI history remain supported", () => {
  for (const command of [
    "help",
    "about",
    "projects",
    "skills",
    "github",
    "contact",
    "neofetch",
    "whoami",
    "rice",
    "matrix",
    "sudo pacman -S rice",
    "uname -a",
  ]) {
    assert.ok(runCommand(command).text.length > 0);
    assert.ok(!runCommand(command).text.includes("command not found"));
  }
  assert.equal(runCommand("clear").clear, true);
  assert.equal(
    runCommand("history", { history: ["pwd", "history"] }).text,
    "1  pwd\n2  history",
  );
});
