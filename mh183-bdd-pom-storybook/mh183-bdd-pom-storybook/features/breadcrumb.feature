@smoke
Feature: Breadcrumb com SEO no Storybook
  Como QA
  Quero validar o breadcrumb da tela
  Para garantir navegação, responsividade e SEO

  Scenario: Validar estrutura hierárquica e SEO do breadcrumb
    Given que acesso a story with children da Navbar
    Then devo visualizar o breadcrumb "Home > Marcas > Fiat > Fastback > 1.0 Turbo 200 Hybrid Impetus CVT 2025"
    And o último item do breadcrumb não deve ser clicável
    And devo encontrar o schema BreadcrumbList em JSON-LD

  @mobile
  Scenario: Validar comportamento do nome longo da versão no mobile
    Given que acesso a story with children da Navbar
    Then o nome longo da versão no breadcrumb deve truncar com reticências ou permitir scroll horizontal
