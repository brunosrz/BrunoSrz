"""SCons task entry point for the portfolio repository."""

import os
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


def _run_pnpm(arguments: list[str]) -> int:
    """Run a pnpm task, using the Windows command processor for .cmd shims."""
    command = ["pnpm", *arguments]
    if sys.platform == "win32":
        command = [
            os.environ.get("COMSPEC", "cmd.exe"),
            "/d",
            "/s",
            "/c",
            subprocess.list2cmdline(command),
        ]
    return subprocess.run(command, cwd=ROOT, check=False).returncode


def _task(arguments: list[str]):
    """Create an SCons action for a fixed pnpm command."""

    def run(target, source, env):
        return _run_pnpm(arguments)

    return Action(run)


env = Environment()
env.AlwaysBuild(env.Alias("lint", action=_task(["run", "lint"])))
env.AlwaysBuild(env.Alias("tests", action=_task(["run", "test"])))
env.AlwaysBuild(env.Alias("build", action=_task(["run", "build"])))
env.AlwaysBuild(env.Alias("deploy", action=_task(["run", "deploy"])))

update_arguments = ["update"]
if GetOption("latest"):
    update_arguments.append("--latest")
env.AlwaysBuild(env.Alias("update", action=_task(update_arguments)))
