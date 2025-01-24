Feature: BusinessTargetTemplates Viewing

  Scenario: Client views the details of a specific BusinessTargetTemplate
    Given the client sends a GET request to "/plangoals/businesstargets/templates?id={templateId}"
    When the request is processed
    Then the response status should be 200 OK
    And the response body should contain the details of the selected business target template

  Scenario: Client views a BusinessTargetTemplate that does not exist
    Given the client sends a GET request to "/plangoals/businesstargets/templates?id={templateId}"
    When the request is processed
    And the BusinessTargetTemplate does not exist
    Then the response status should be 404 Not Found
    And the response body should contain an error message indicating the business target template does not exist