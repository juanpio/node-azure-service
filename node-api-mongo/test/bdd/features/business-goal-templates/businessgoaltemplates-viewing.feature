Feature: BusinessGoalTemplates Viewing

  Scenario: Client views the details of a specific BusinessGoalTemplate
    Given the client sends a GET request to "/businessgoals/templates?id={templateId}"
    When the request is processed
    Then the response status should be 200 OK
    And the response body should contain the details of the selected business goal template

  Scenario: Client views a BusinessGoalTemplate that does not exist
    Given the client sends a GET request to "/businessgoals/templates?id={templateId}"
    When the request is processed
    And the BusinessGoalTemplate does not exist
    Then the response status should be 404 Not Found
    And the response body should contain an error message indicating the business goal template does not exist