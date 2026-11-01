import {
  chmod,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { delimiter, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { afterAll, describe, expect, it } from "vitest";

const rootSConstruct = resolve("SConstruct");
const temporaryDirectories: string[] = [];

const fakeVercelCli = `
const fs = require("node:fs");
const args = process.argv.slice(2);
const [command] = args;
fs.appendFileSync(process.env.VERCEL_TEST_LOG, JSON.stringify(args) + "\\n");

if (command === "whoami") {
  process.stdout.write("test-user\\n");
  process.exit(process.env.VERCEL_TEST_WHOAMI_FAIL === "1" ? 1 : 0);
}

if (command === "project") {
  process.stdout.write(JSON.stringify({
    projects: [{
      id: process.env.VERCEL_TEST_REMOTE_PROJECT_ID,
      name: "brunosrz",
    }],
  }));
}
`;

async function createFixture(
  linkedProjectId = "project-expected",
  whoamiFails = false,
) {
  const cwd = await mkdtemp(join(tmpdir(), "brunosrz-scons-deploy-"));
  temporaryDirectories.push(cwd);
  const linkDirectory = join(cwd, ".vercel");
  const binaryDirectory = join(cwd, "bin");
  const callLog = join(cwd, "vercel-calls.jsonl");
  await mkdir(linkDirectory, { recursive: true });
  await mkdir(binaryDirectory);
  await writeFile(
    join(linkDirectory, "project.json"),
    JSON.stringify({ projectId: linkedProjectId, orgId: "team-fixture" }),
  );
  await writeFile(join(binaryDirectory, "fake-vercel.js"), fakeVercelCli);

  if (process.platform === "win32") {
    await writeFile(
      join(binaryDirectory, "vercel.cmd"),
      '@echo off\r\nnode "%~dp0fake-vercel.js" %*\r\nexit /b %errorlevel%\r\n',
    );
  } else {
    const executable = join(binaryDirectory, "vercel");
    await writeFile(executable, `#!/usr/bin/env node\n${fakeVercelCli}`);
    await chmod(executable, 0o755);
  }

  const pathName =
    Object.keys(process.env).find((name) => name.toLowerCase() === "path") ??
    "PATH";
  const env = {
    ...process.env,
    [pathName]: `${binaryDirectory}${delimiter}${process.env[pathName] ?? ""}`,
    VERCEL_TEST_LOG: callLog,
    VERCEL_TEST_REMOTE_PROJECT_ID: "project-expected",
    VERCEL_TEST_WHOAMI_FAIL: whoamiFails ? "1" : "0",
  };

  return { cwd, callLog, env };
}

function runScons(cwd: string, env: NodeJS.ProcessEnv, production = false) {
  const args = ["-Q", "-f", rootSConstruct, "deploy"];
  if (production) args.push("--prod");

  return spawnSync(process.platform === "win32" ? "scons.exe" : "scons", args, {
    cwd,
    env,
    encoding: "utf8",
    timeout: 30_000,
  });
}

async function readCalls(callLog: string): Promise<string[][]> {
  const contents = await readFile(callLog, "utf8");
  return contents
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line) as string[]);
}

afterAll(async () => {
  await Promise.all(
    temporaryDirectories.map((directory) =>
      rm(directory, { force: true, recursive: true }),
    ),
  );
});

describe("SCons Vercel deploy preflights", () => {
  it.each([
    { mode: "preview", production: false, expectedArgs: ["deploy", "--yes"] },
    {
      mode: "production",
      production: true,
      expectedArgs: ["deploy", "--yes", "--prod"],
    },
  ])(
    "passes the correct CLI flags for a $mode deploy",
    async ({ production, expectedArgs }) => {
      const fixture = await createFixture();

      const result = runScons(fixture.cwd, fixture.env, production);

      expect(result.status, `${result.stdout}\n${result.stderr}`).toBe(0);
      await expect(readCalls(fixture.callLog)).resolves.toEqual([
        ["whoami"],
        [
          "project",
          "ls",
          "--format=json",
          "--filter",
          "brunosrz",
          "--scope",
          "team-fixture",
        ],
        expectedArgs,
      ]);
    },
    30_000,
  );

  it("does not deploy when the Vercel session is unauthenticated", async () => {
    const fixture = await createFixture("project-expected", true);

    const result = runScons(fixture.cwd, fixture.env);

    expect(result.status).not.toBe(0);
    await expect(readCalls(fixture.callLog)).resolves.toEqual([["whoami"]]);
  }, 30_000);

  it("does not deploy when the linked project ID is wrong", async () => {
    const fixture = await createFixture("project-wrong");

    const result = runScons(fixture.cwd, fixture.env);

    expect(result.status).not.toBe(0);
    const calls = await readCalls(fixture.callLog);
    expect(calls).toHaveLength(2);
    expect(calls[0]).toEqual(["whoami"]);
    expect(calls[1]?.[0]).toBe("project");
    expect(calls.some(([command]) => command === "deploy")).toBe(false);
  }, 30_000);
});
