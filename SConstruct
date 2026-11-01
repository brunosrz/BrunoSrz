"""SCons task entry point for the portfolio repository."""

import asyncio
import json
import os
import shlex
import shutil
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
AddOption(
    "--prod",
    dest="prod",
    action="store_true",
    default=False,
    help="Deploy to the linked Vercel project's production environment.",
)

ROOT = Dir(".").abspath
VERCEL = "vercel"
if sys.platform == "win32":
    for candidate in ("vercel.cmd", "vercel.exe", "vercel"):
        found = shutil.which(candidate)
        if found:
            VERCEL = found
            break
else:
    VERCEL = shutil.which("vercel") or VERCEL


async def _run_command(command: list[str]) -> int:
    """Run a command from the project root and return its exit status."""
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


async def _run_bun(arguments: list[str]) -> int:
    """Run a Bun task asynchronously and return its exit status."""
    return await _run_command(["bun", *arguments])


async def _run_vercel(arguments: list[str]) -> int:
    """Run the authenticated Vercel CLI found on PATH."""
    return await _run_command([VERCEL, *arguments])


def _check_vercel_auth() -> int:
    """Fail before deploy when the Vercel CLI on PATH has no active login."""
    try:
        result = subprocess.run(
            [VERCEL, "whoami"],
            cwd=ROOT,
            stdin=subprocess.DEVNULL,
            check=False,
        )
    except OSError:
        print(
            "\n[scons deploy] Não encontrei o Vercel CLI no PATH.\n"
            "  Instale-o globalmente e confirme com `vercel --version`.\n"
        )
        return 127
    if result.returncode != 0:
        print(
            "\n[scons deploy] O CLI Vercel encontrado no PATH não está autenticado.\n"
            "  Autentique essa mesma instalação com `vercel login` e confirme\n"
            "  com `vercel whoami` antes de repetir o deploy.\n"
        )
    return result.returncode


def _check_vercel_link() -> bool:
    """Ensure this repository is linked to its own Vercel project."""
    link_path = os.path.join(ROOT, ".vercel", "project.json")
    if not os.path.isfile(link_path):
        print(
            "\n[scons deploy] A raiz do repositório não está linkada à Vercel.\n"
            "  Rode `vercel link` na raiz e selecione o projeto `brunosrz`.\n"
        )
        return False

    try:
        with open(link_path, encoding="utf-8") as link_file:
            project_config = json.load(link_file)
            linked_project = (
                project_config.get("projectName", "")
                if isinstance(project_config, dict)
                else ""
            )
    except (OSError, json.JSONDecodeError):
        linked_project = ""

    if linked_project != "brunosrz":
        print(
            "\n[scons deploy] A raiz está linkada ao projeto Vercel errado.\n"
            f"  Linkado: '{linked_project or 'desconhecido'}'\n"
            "  Esperado: 'brunosrz'\n"
            "  Rode `vercel link` na raiz e selecione o projeto correto.\n"
        )
        return False
    return True


def _task(
    arguments: list[str],
    runner=_run_bun,
) -> Action:
    """Create an SCons action for a fixed command."""

    def run(target: object, source: object, env: object) -> int:
        return asyncio.run(runner(arguments))

    return Action(run)


def _deploy_task(arguments: list[str]) -> Action:
    """Create a deployment action with auth and project-link preflights."""

    def run(target: object, source: object, env: object) -> int:
        auth_status = _check_vercel_auth()
        if auth_status != 0:
            return auth_status
        if not _check_vercel_link():
            return 1
        return asyncio.run(_run_vercel(arguments))

    return Action(run)


env = Environment()
env.AlwaysBuild(env.Alias("lint", action=_task(["run", "lint"])))
env.AlwaysBuild(env.Alias("typecheck", action=_task(["run", "typecheck"])))
env.AlwaysBuild(env.Alias("tests", action=_task(["run", "test"])))
env.AlwaysBuild(env.Alias("build", action=_task(["run", "build"])))
deploy_arguments = ["deploy", "--yes"]
if GetOption("prod"):
    deploy_arguments.append("--prod")
env.AlwaysBuild(
    env.Alias("deploy", action=_deploy_task(deploy_arguments))
)

update_arguments = ["update"]
if GetOption("latest"):
    update_arguments.append("--latest")
env.AlwaysBuild(env.Alias("update", action=_task(update_arguments)))
