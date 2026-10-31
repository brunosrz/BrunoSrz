# Portfólio de brunosrz

Portfólio pessoal de **brunosrz**, engenheiro de software autodidata com atuação em IA aplicada e produtos full stack. O site apresentará experiência e evidências de trabalho em engenharia de software. O plano de entrega está organizado na [issue guarda-chuva #1](https://github.com/brunosrz/brunosrz/issues/1).

## Projetos e stack

O portfólio apresentará Vectora, Ability System e Delivery Express (`vectora.chat`) com descrições baseadas no trabalho e no estágio real de cada projeto. Ability System e Delivery Express terão subdomínios próprios em etapas futuras; os respectivos sites ainda serão desenvolvidos. Este repositório é a presença profissional pessoal de brunosrz, não um site de empresa.

A aplicação será baseada em TanStack Start e Vite, com Tailwind CSS para estilos, Paraglide para internacionalização e Motion para animações. A configuração da aplicação entra na segunda etapa; esta primeira etapa prepara os comandos e a automação do repositório.

## Requisitos

- Node.js 24 ou compatível com a versão definida pela aplicação.
- pnpm, na versão fixada pelo campo `packageManager` do `package.json`.
- Python e SCons para executar os comandos de build e manutenção.

Instale as dependências JavaScript na raiz:

```sh
pnpm install
```

## Desenvolvimento e qualidade

Os comandos SCons centralizam tarefas comuns:

```sh
scons lint
scons tests
scons build
scons deploy
scons update
scons update --latest
```

`update` respeita os intervalos declarados no `package.json`; `update --latest` pode atualizar versões principais. Revise changelogs e alterações incompatíveis antes de integrar esse resultado. Build e deploy ficam disponíveis quando os scripts da aplicação forem adicionados na etapa de bootstrap.

Instale os hooks locais antes de contribuir e rode os checks:

```sh
pre-commit install
pre-commit run --all-files
```

Os pull requests rodam hooks, lint e testes em Linux e Windows. A CI não dispara deploy automaticamente.

## Fluxo de contribuição

Cada etapa da issue #1 tem uma issue e um pull request próprios. Use branches `feat/`, `fix/` ou `chore/` e títulos Conventional Commits. Os PRs incluem evidência dos checks executados e são revisados pelo CodeRabbit AI. PRs posteriores ao primeiro aguardam aprovação antes de começar.

## Segurança

Nunca versione credenciais. Arquivos `.env` são ignorados pelo Git; use apenas exemplos sem valores reais quando uma configuração local for necessária. Consulte [SECURITY.md](SECURITY.md) para reportar vulnerabilidades.
