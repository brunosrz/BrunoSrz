import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const packageJson = JSON.parse(await readFile("package.json", "utf8"));
const sconstruct = await readFile("SConstruct", "utf8");

test("root package defines the expected quality scripts", () => {
  assert.equal(packageJson.name, "brunosrz-portfolio");
  assert.equal(packageJson.private, true);
  assert.equal(typeof packageJson.scripts.lint, "string");
  assert.equal(typeof packageJson.scripts.test, "string");
});

test("SCons forwards project tasks and latest dependency updates", () => {
  for (const task of ["lint", "tests", "build", "deploy", "update"]) {
    assert.match(sconstruct, new RegExp(`Alias\\("${task}"`));
  }
  assert.match(sconstruct, /update_arguments\.append\("--latest"\)/);
});
