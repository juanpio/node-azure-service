Feature: KPITemplates Viewing

  Scenario: Client views the details of a specific KPITemplate
    Given the client sends a GET request to "/kpis/templates?id={templateId}"
    When the request is processed
    Then the response status should be 200 OK
    And the response body should contain the details of the selected KPI template

  Scenario: Client views a KPITemplate that does not exist
    Given the client sends a GET request to "/kpis/templates?id={templateId}"
    When the request is processed
    And the KPITemplate does not exist
    Then the response status should be 404 Not Found
    And the response body should contain an error message indicating the KPI template does not exist