# Contribuindo

Este guia descreve o fluxo de trabalho para o portfólio pessoal de brunosrz.

## Issues e pull requests

Associe mudanças a uma issue e abra um pull request. A issue #1 organiza o trabalho em três etapas: fundação (#2), stack (#3) e landing page (#4). Mantenha a sequência e aguarde aprovação antes de iniciar as etapas posteriores ao primeiro PR.

Use títulos e commits Conventional Commits, por exemplo `feat: add accessible portfolio navigation`, `fix: preserve mobile menu state` ou `docs: explain local setup`. Descreva no PR o objetivo, as alterações, os checks executados e capturas de tela para mudanças visuais.

## Antes de enviar

Instale e execute os hooks locais:

```sh
pnpm install
pre-commit install
pre-commit run --all-files
```

Use pre-commit 3.2.0 ou superior. O hook de formatação chama o Prettier instalado pelo projeto para manter a versão sincronizada com as dependências.

Execute também `scons lint`, `scons tests` e `scons build` quando a etapa já tiver esses scripts configurados. Não inclua `.env`, tokens, arquivos de build ou mudanças sem relação com a issue.
