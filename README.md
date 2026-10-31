# Portfólio de brunosrz

Portfólio pessoal de **brunosrz**, engenheiro de software autodidata com atuação em IA aplicada e produtos full stack. O site apresentará experiência e evidências de trabalho em engenharia de software. O plano de entrega está organizado na [issue guarda-chuva #1](https://github.com/brunosrz/brunosrz/issues/1).

## Projetos e stack

O portfólio apresentará Vectora, Ability System e Delivery Express com descrições baseadas no trabalho e no estágio real de cada projeto. [Vectora](https://vectora.chat/features) é uma plataforma de engenharia de software com agentes de IA, contexto de código, ferramentas de desenvolvimento e infraestrutura própria. A página de funcionalidades documenta, entre outros recursos, o motor de conversa nativo, subagentes e kanban multiagente, Context Graph, RAG híbrido, terminal e Git integrados, navegador compartilhado e sandbox multiplataforma. Ability System e Delivery Express terão subdomínios próprios em etapas futuras; esses sites ainda serão desenvolvidos. Este repositório é a presença profissional pessoal de brunosrz, não um site de empresa.

A aplicação é baseada em TanStack Start e Vite, com Tailwind CSS, Paraglide e Motion. O scaffold gerado pelo TanStack permanece como exemplo inicial; a identidade visual e o conteúdo próprios do portfólio serão implementados em uma etapa separada.

## Requisitos

- Node.js 24 ou compatível com a versão definida pela aplicação.
- Bun 1.4.4, na versão fixada pelo campo `packageManager` do `package.json`.
- Python 3.13 ou superior e SCons para executar os comandos de build e manutenção.

Instale as dependências JavaScript na raiz:

```sh
bun install
```

## Aplicação scaffold

Use estes comandos para executar o scaffold e as ferramentas instaladas:

```sh
bun run dev
bun run build
bun run typecheck
bun run lint
bun run format
bun run test
bun run test:watch
bun run test:e2e
```

Paraglide está configurado para inglês (`en`) e português brasileiro (`pt-BR`), com rotas localizadas e suporte a SSR. As mensagens-fonte ficam em `messages/`; os módulos gerados em `src/paraglide/` não devem ser editados.

Vitest, Testing Library e jsdom ficam disponíveis para testes unitários e de componentes. Para cada comportamento novo, cubra caminho feliz, entradas ou estados inválidos e regressões. Playwright está configurado para navegadores desktop e mobile; os testes do próprio portfólio serão adicionados junto com a interface.

## Desenvolvimento e qualidade

Os comandos SCons centralizam tarefas comuns:

```sh
scons lint
scons typecheck
scons tests
scons build
scons deploy
scons update
scons update --latest
```

`update` respeita os intervalos declarados no `package.json`; `update --latest` pode atualizar versões principais. Revise changelogs e alterações incompatíveis antes de integrar esse resultado. O alvo `deploy` será ligado ao provedor de hospedagem numa etapa posterior.

Os hooks locais validam whitespace, fim de arquivo, YAML/JSON, conflitos, tamanho e chaves privadas. Também ordenam as mensagens i18n, formatam com Prettier, analisam JS/TS com Oxlint, verificam tipos, compilam os utilitários Python e validam workflows do GitHub Actions.

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
