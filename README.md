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
scons deploy              # preview
scons deploy --prod       # produção; prod é uma opção, não um target
scons update
scons update --latest
```

`update` respeita os intervalos de versão do `package.json`; `update --latest` também pode atualizar versões principais. Revise changelogs e incompatibilidades antes de integrar essas atualizações. O deploy exige uma conta Vercel e o vínculo deste repositório a um projeto.

O deploy pelo SCons usa o CLI global `vercel` encontrado no `PATH`, como no repositório Vectora. No Windows, o SCons também procura os shims `vercel.cmd` e `vercel.exe`. Para publicar, instale globalmente o CLI (por exemplo, `npm install --global vercel`), autentique essa instalação e vincule a raiz do repositório ao projeto uma vez:

```sh
vercel --version
vercel login
vercel link
```

Antes de cada deploy, o SCons confirma a sessão com `vercel whoami` e verifica se o `projectId` em `.vercel/project.json` corresponde ao projeto `brunosrz` no escopo autenticado. Depois, `scons deploy` cria um preview e `scons deploy --prod` solicita um deploy de produção. O segundo comando publica no domínio de produção configurado no projeto Vercel. `prod` é uma opção, não um target SCons; use `--prod`, não `scons deploy prod`. Verifique o URL e os logs de build retornados pelo CLI após cada deploy. `bun run deploy` também passa pelo SCons e executa os mesmos preflights.

## SEO e compartilhamento

O site publica metadados localizados em inglês e português, URLs canônicas e alternates `hreflang`, dados estruturados de perfil pessoal, sitemap, `robots.txt` e cartões Open Graph/X. O domínio oficial é `brunosrz.com`; como o host raiz redireciona permanentemente para `www.brunosrz.com`, esse é o host canônico usado em SEO. Se o domínio mudar, atualize as referências em `src/routes/__root.tsx`, `public/robots.txt`, `public/sitemap.xml` e nos cartões sociais. Os previews continuam apontando para o domínio canônico. Os arquivos de marca incluem SVG, ICO, PNGs em vários tamanhos e imagens sociais localizadas de 1200 × 630.

Depois de publicar, verifique o HTML renderizado e os endpoints `/robots.txt`, `/sitemap.xml` e imagens sociais. Search Console, o teste de resultados avançados do Google e os depuradores de compartilhamento ajudam a validar rastreamento, dados estruturados e cards. A implementação não garante indexação nem atualização imediata dos caches das plataformas.

Instale os hooks locais e execute as verificações antes de abrir um pull request:

```sh
pre-commit install
pre-commit run --all-files
```

Os testes de ponta a ponta usam Chromium e o build Nitro de produção para verificar o HTML renderizado. Gere o build e instale o browser uma vez antes de executá-los localmente:

```sh
bunx playwright install chromium
bun run build
bun run test:e2e
```

A CI executa os hooks, lint, tipagem, testes e build em Linux e Windows. Ela não publica o site automaticamente; deploys são iniciados manualmente pelo CLI.

## Contribuição

Cada etapa da [issue guarda-chuva #1](https://github.com/brunosrz/brunosrz/issues/1) tem sua própria issue e seu pull request. Use branches `feat/`, `fix/` ou `chore/`, mensagens Conventional Commits e inclua evidências dos checks executados. Os pull requests passam por revisão do CodeRabbit AI.

## Segurança

Nunca versione credenciais. Arquivos `.env` são ignorados pelo Git; use exemplos sem valores reais quando uma configuração local for necessária. Consulte [SECURITY.md](SECURITY.md) para reportar vulnerabilidades.
