# MH-183 — Playwright + BDD (Cucumber) + POM + Allure + CI/CD

Projeto pronto para validar o componente **Navbar Atualizado** e o **Breadcrumb** direto no **Storybook**.

## Stack
- Playwright
- Cucumber (BDD / Gherkin)
- Page Object Model
- Allure Report
- GitHub Actions (CI/CD)

## Estrutura
```text
features/
  navbar.feature
  breadcrumb.feature
  uf.feature
  step-definitions/
src/
  hooks/
  pages/
  utils/
.github/workflows/
```

## 1) Instalação
```bash
npm install
npx playwright install --with-deps
```

## 2) Configuração
Copie o arquivo `.env.example` para `.env`.

```bash
cp .env.example .env
```

Ajuste principalmente:
- `BASE_URL`
- `STORY_ID`
- `STORY_WITH_CHILDREN_ID`
- `LOGIN_B2B_URL`

## 3) Rodar o Storybook
No projeto alvo:
```bash
pnpm run storybook
```

## 4) Executar os testes
```bash
npm test
```

Executar apenas smoke:
```bash
npm run test:smoke
```

Executar apenas mobile:
```bash
npm run test:mobile
```

## 5) Gerar relatório Allure
```bash
npm run allure:generate
npm run allure:open
```

## O que está coberto
### Navbar
- sticky no topo
- logo à esquerda
- links desktop
- dropdown “Soluções”
- dropdown “Países”
- CTA “Acessar plataforma”
- menu hambúrguer no mobile
- redirecionamento da logo para Home

### UF
- Geolocation API
- fallback por IP
- fallback final para SP

### Breadcrumb
- exibição abaixo do banner
- estrutura `Home > Marcas > Marca > Modelo > Versão`
- último item não clicável
- links intermediários clicáveis
- schema JSON-LD `BreadcrumbList`
- nome longo no mobile sem quebrar de forma incorreta

## Ajustes esperados no projeto real
Para máxima estabilidade, adicione `data-testid` no componente real:
- `navbar`
- `navbar-logo-link`
- `navbar-menu-item`
- `navbar-dropdown-toggle`
- `navbar-drawer-toggle`
- `navbar-drawer`
- `navbar-cta-login`
- `uf-field`
- `breadcrumb`
- `breadcrumb-current`

## Pipeline
O workflow em `.github/workflows/e2e-storybook.yml`:
- instala dependências
- instala browsers do Playwright
- sobe Storybook
- executa Cucumber
- publica artefatos do Allure

## Observação
Este pacote está preparado para rodar direto no Storybook e foi desenhado para o requisito do MH-183. Se os nomes das stories ou seletores forem diferentes, basta ajustar os arquivos em `src/pages` e `.env`.
