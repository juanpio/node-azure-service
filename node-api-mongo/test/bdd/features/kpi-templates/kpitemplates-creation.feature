Feature: KpiTemplates Creation

  Scenario: Client creates a new KpiTemplate
    Given the client sends a POST request to "/kpis/templates" with body containing name, description, unitOfMeasure, type, metric
    When the request is processed
    Then the response status should be 201 Created
    And the response body should contain the created KpiTemplate details

  Scenario: Client fails to create a new KpiTemplate due to missing required information
    Given the client sends a POST request to "/kpis/templates" without a name
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating that the name is required

  Scenario: Client tries to create a KpiTemplate with a duplicate name
    Given the client sends a POST request to "/kpis/templates" with a name that already exists
    When the request is processed
    And a KpiTemplate with the name already exists
    Then the response status should be 409 Conflict
    And the response body should contain an error message indicating the name already exists

  Scenario: Client tries to create a KpiTemplate with an invalid unitOfMeasure
    Given the client sends a POST request to "/kpis/templates" with an invalid unitOfMeasure
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating the unitOfMeasure is invalid

  Scenario: Client tries to create a KpiTemplate with an invalid type
    Given the client sends a POST request to "/kpis/templates" with an invalid type
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating the type is invalid

  Scenario: Client tries to create a KpiTemplate with an invalid metric
    Given the client sends a POST request to "/kpis/templates" with an invalid metric
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating the metric is invalid