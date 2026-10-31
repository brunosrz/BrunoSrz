"""SCons task entry point for the portfolio repository."""

import asyncio
import os
import shlex
import subprocess
import sys

from SCons.Script import Action, AddOption, Environment, GetOption

AddOption(
    "--latest",
    dest="latest",
    action="store_true",
    default=False,
    help="With update, allow dependency updates across declared version ranges.",
)

ROOT = Dir(".").abspath


async def _run_bun(arguments: list[str]) -> int:
    """Run a Bun task asynchronously and return its exit status."""
    command = ["bun", *arguments]
    if sys.platform == "win32":
        command_line = subprocess.list2cmdline(command)
        process = await asyncio.create_subprocess_shell(
            command_line,
            cwd=ROOT,
            executable=os.environ.get("COMSPEC", "cmd.exe"),
        )
    else:
        process = await asyncio.create_subprocess_shell(
            shlex.join(command),
            cwd=ROOT,
        )
    return await process.wait()


def _task(arguments: list[str]) -> Action:
    """Create an SCons action for a fixed Bun command."""

    def run(target: object, source: object, env: object) -> int:
        return asyncio.run(_run_bun(arguments))

    return Action(run)


env = Environment()
env.AlwaysBuild(env.Alias("lint", action=_task(["run", "lint"])))
env.AlwaysBuild(env.Alias("typecheck", action=_task(["run", "typecheck"])))
env.AlwaysBuild(env.Alias("tests", action=_task(["run", "test"])))
env.AlwaysBuild(env.Alias("build", action=_task(["run", "build"])))
env.AlwaysBuild(env.Alias("deploy", action=_task(["run", "deploy"])))

update_arguments = ["update"]
if GetOption("latest"):
    update_arguments.append("--latest")
env.AlwaysBuild(env.Alias("update", action=_task(update_arguments)))
