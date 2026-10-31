import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const packageJson = JSON.parse(await readFile("package.json", "utf8"));
const sconstruct = await readFile("SConstruct", "utf8");
const preCommitConfig = await readFile(".pre-commit-config.yaml", "utf8");
const ciWorkflow = await readFile(".github/workflows/ci.yml", "utf8");
const readme = await readFile("README.md", "utf8");

test("root package defines the expected quality scripts", () => {
  assert.equal(packageJson.name, "brunosrz-portfolio");
  assert.equal(packageJson.private, true);
  assert.equal(typeof packageJson.scripts.lint, "string");
  assert.equal(typeof packageJson.scripts.test, "string");
  assert.equal(packageJson.devDependencies.prettier, "3.9.9");
});

test("SCons forwards project tasks and latest dependency updates", () => {
  for (const task of ["lint", "tests", "build", "deploy", "update"]) {
    assert.match(sconstruct, new RegExp(`Alias\\("${task}"`));
  }
  assert.match(sconstruct, /update_arguments\.append\("--latest"\)/);
});

test("pre-commit uses the project's Prettier version", () => {
  assert.match(preCommitConfig, /minimum_pre_commit_version: 3\.2\.0/);
  assert.match(preCommitConfig, /entry: pnpm exec prettier --write/);
  assert.match(preCommitConfig, /language: system/);
});

test("CI reruns the title check when a pull request is edited", () => {
  assert.match(
    ciWorkflow,
    /pull_request:\s+types: \[opened, synchronize, reopened, edited\]/,
  );
});

test("portfolio associates vectora.chat with Vectora, not Delivery Express", () => {
  assert.match(readme, /\[Vectora\]\(https:\/\/vectora\.chat\/features\)/);
  assert.doesNotMatch(readme, /Delivery Express \([^)]*vectora\.chat/);
  assert.match(readme, /Ability System e Delivery Express/);
});
