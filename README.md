# Portfólio de brunosrz

Site pessoal de Bruno Soares, engenheiro de software autodidata com atuação em IA aplicada e produtos full stack. O portfólio reúne projetos, experiência prática e formas de contato; apresenta a trajetória de uma pessoa desenvolvedora, não de uma empresa.

## Projetos

O portfólio destaca três projetos em seus estágios reais de desenvolvimento:

- [Vectora](https://vectora.chat/features): plataforma de engenharia de software com IA, agentes especializados, contexto de código e ferramentas integradas. Consulte a página de funcionalidades para detalhes e maturidade de cada capacidade.
- [Ability System](https://github.com/brunosrz/AbilitySystem): framework open source em C++/GDExtension para Godot 4.x, em preparação para distribuição pública.
- [Delivery Express](https://github.com/brunosrz/Delivery): produto B2B em desenvolvimento para cardápios, pedidos e operação de restaurantes. O site próprio em subdomínio faz parte de uma etapa futura.

Os futuros sites de Ability System e Delivery Express serão publicados em subdomínios próprios quando estiverem prontos. Este repositório contém o portfólio pessoal.

## Stack

A aplicação usa TanStack Start, Vite, Tailwind CSS, Paraglide para português e inglês, Motion para animações e Bun para dependências e scripts. O layout é mobile first e também se adapta a tablets e desktops.

Os endereços dos futuros sites dedicados são opcionais e configurados por `VITE_ABILITY_SYSTEM_SITE_URL` e `VITE_DELIVERY_EXPRESS_SITE_URL`. Enquanto os subdomínios não estiverem publicados, os cartões mostram que esses sites estão planejados. Use `.env.example` como referência e não versione arquivos `.env`.

## Requisitos

Use Bun 1.4.4, Node.js 24 ou compatível com o campo `engines`, Python e SCons.

Instale as dependências na raiz:

```sh
bun install
```

## Desenvolvimento e qualidade

Inicie o servidor local:

```sh
bun run dev
```

Os comandos SCons centralizam as tarefas do projeto:

```sh
scons lint
scons typecheck
scons tests
scons build
scons deploy
scons update
scons update --latest
```

`update` respeita os intervalos de versão do `package.json`; `update --latest` também pode atualizar versões principais. Revise changelogs e incompatibilidades antes de integrar essas atualizações. Deploy só ficará disponível quando a configuração da plataforma de hospedagem for definida.

Instale os hooks locais e execute as verificações antes de abrir um pull request:

```sh
pre-commit install
pre-commit run --all-files
```

A CI executa os hooks, lint, tipagem, testes e build em Linux e Windows. Ela não publica o site automaticamente.

## Contribuição

Cada etapa da [issue guarda-chuva #1](https://github.com/brunosrz/brunosrz/issues/1) tem sua própria issue e seu pull request. Use branches `feat/`, `fix/` ou `chore/`, mensagens Conventional Commits e inclua evidências dos checks executados. Os pull requests passam por revisão do CodeRabbit AI.

## Segurança

Nunca versione credenciais. Arquivos `.env` são ignorados pelo Git; use exemplos sem valores reais quando uma configuração local for necessária. Consulte [SECURITY.md](SECURITY.md) para reportar vulnerabilidades.
