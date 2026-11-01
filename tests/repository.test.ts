import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

const sconstruct = await readFile("SConstruct", "utf8");
const preCommitConfig = await readFile(".pre-commit-config.yaml", "utf8");
const ciWorkflow = await readFile(".github/workflows/ci.yml", "utf8");
const readme = await readFile("README.md", "utf8");
const viteConfig = await readFile("vite.config.ts", "utf8");

interface PackageManifest {
  name: string;
  private: boolean;
  packageManager: string;
  scripts: { deploy: string; lint: string; test: string };
  devDependencies: { nitro: string; prettier: string };
}

const manifest: PackageManifest = JSON.parse(
  await readFile("package.json", "utf8"),
);

describe("scaffold tooling", () => {
  it("uses Bun and exposes the expected quality scripts", () => {
    expect(manifest.name).toBe("brunosrz-portfolio");
    expect(manifest.private).toBe(true);
    expect(manifest.packageManager).toMatch(/^bun@/);
    expect(manifest.scripts.lint).toEqual(expect.any(String));
    expect(manifest.scripts.test).toMatch(/vitest run/);
    expect(manifest.devDependencies.prettier).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it("routes project tasks and latest dependency updates through Bun in SCons", () => {
    for (const task of [
      "lint",
      "typecheck",
      "tests",
      "build",
      "deploy",
      "update",
    ]) {
      expect(sconstruct).toContain(`Alias("${task}"`);
    }
    expect(sconstruct).toContain('command = ["bun", *arguments]');
    expect(sconstruct).toContain('update_arguments.append("--latest")');
  });

  it("configures Nitro and Vercel deploy commands through SCons", () => {
    expect(viteConfig).toContain('import { nitro } from "nitro/vite"');
    expect(viteConfig).toContain("nitro(),");
    expect(manifest.devDependencies.nitro).toBe("3.0.261029-rc");
    expect(manifest.scripts.deploy).toBe("bunx vercel@65.9.0 deploy");
    expect(sconstruct).toContain('"--prod",');
    expect(sconstruct).toContain('deploy_arguments.append("--prod")');
    expect(readme).toContain("scons deploy --prod");
    expect(readme).toContain("scons deploy prod");
  });

  it("runs formatting and translation ordering hooks with the project config", () => {
    expect(preCommitConfig).toContain("minimum_pre_commit_version: 3.2.0");
    expect(preCommitConfig).toContain("entry: bun run prettier --write");
    expect(preCommitConfig).toContain(
      "entry: python utils/sort_translation_keys.py --check",
    );
    expect(preCommitConfig).toContain("entry: bun run oxlint");
  });

  it("installs Bun and reruns the pull request title check after edits", () => {
    expect(ciWorkflow).toContain(
      "uses: oven-sh/setup-bun@0c5077e51419868618aeaa5fe8019c62421857d6",
    );
    expect(ciWorkflow).toContain("run: bun install --frozen-lockfile");
    expect(ciWorkflow).toMatch(
      /pull_request:\s+types: \[opened, synchronize, reopened, edited\]/,
    );
  });
});

describe("portfolio project references", () => {
  it("links Vectora to its feature overview", () => {
    expect(readme).toMatch(/\[Vectora\]\(https:\/\/vectora\.chat\/features\)/);
  });

  it("does not misattribute Vectora as Delivery Express", () => {
    expect(readme).not.toMatch(/Delivery Express \([^)]*vectora\.chat/);
    expect(readme).toContain("Ability System e Delivery Express");
  });
});
