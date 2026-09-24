import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { workspaces } from "../src/data/portfolio.js";

const html = readFileSync(new URL("../dist/index.html", import.meta.url), "utf8");
test("startup shell cannot flash a static portfolio before React loads", () => {
  assert.match(html, /<div id="root"><\/div>/);
  assert.ok(!html.includes("static-portfolio"));
  assert.match(
    html,
    /<style>html,\s*body\s*\{\s*background:\s*#09080f;?\s*\}<\/style>/,
  );
  assert.match(html, /<script type="module"[^>]+src="\/assets\//);
});
test("workspace identifiers remain unique with six keyboard workspaces", () => {
  assert.equal(new Set(workspaces.map(({ id }) => id)).size, workspaces.length);
  assert.equal(workspaces.filter((workspace) => workspace.label).length, 6);
});
test("social metadata describes the current terminal", () => {
  assert.ok(html.includes("Kitty"));
});
