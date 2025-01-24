Feature: PlanGoalTemplates Viewing

  Scenario: Client views the details of a specific PlanGoalTemplate
    Given the client sends a GET request to "/plangoals/templates?id={templateId}"
    When the request is processed
    Then the response status should be 200 OK
    And the response body should contain the details of the selected plan goal template

  Scenario: Client views a PlanGoalTemplate that does not exist
    Given the client sends a GET request to "/plangoals/templates?id={templateId}"
    When the request is processed
    And the PlanGoalTemplate does not exist
    Then the response status should be 404 Not Found
    And the response body should contain an error message indicating the plan goal template does not exist