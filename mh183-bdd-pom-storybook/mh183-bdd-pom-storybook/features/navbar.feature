@smoke
Feature: Navbar atualizada no Storybook
  Como QA
  Quero validar a navbar no Storybook
  Para garantir navegação desktop e mobile com comportamento consistente

  Scenario: Validar navbar sticky com logo, links, dropdowns e CTA no desktop
    Given que acesso a story default da Navbar
    Then a navbar deve permanecer sticky no topo
    And a logo deve apontar para a Home
    And devo visualizar os links "Quem Somos", "Para Quem", "Blog", "Contato" e "Cadastre-se"
    When eu abrir o dropdown "Soluções"
    Then devo visualizar os links de soluções
    When eu abrir o dropdown "Países"
    Then devo visualizar os links de países
    And devo visualizar o CTA "Acessar plataforma"

  @mobile
  Scenario: Validar menu hambúrguer no mobile
    Given que acesso a story default da Navbar
    When eu abrir o menu hambúrguer
    Then devo visualizar os links principais no drawer mobile
