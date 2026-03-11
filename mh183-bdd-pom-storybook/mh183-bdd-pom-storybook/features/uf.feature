Feature: Campo UF com estratégia de fallback
  Como QA
  Quero validar a origem do preenchimento automático da UF
  Para garantir fallback conforme regra de negócio

  Scenario: Preencher UF via geolocation
    Given que a geolocalização retorna uma UF válida
    When eu acessar a story default da Navbar
    Then o campo UF deve ser preenchido com a UF da geolocalização

  Scenario: Preencher UF via IP quando geolocalização falhar
    Given que a geolocalização falha e o serviço de IP retorna uma UF válida
    When eu acessar a story default da Navbar
    Then o campo UF deve ser preenchido com a UF do IP

  Scenario: Preencher UF com SP quando geolocalização e IP falharem
    Given que a geolocalização falha e o serviço de IP também falha
    When eu acessar a story default da Navbar
    Then o campo UF deve ser preenchido com a UF padrão
