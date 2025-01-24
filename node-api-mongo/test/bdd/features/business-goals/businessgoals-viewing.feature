Feature: BusinessGoals Viewing

  Scenario: Client views the details of a specific BusinessGoal
    Given the client sends a GET request to "/businessgoals?id={businessGoalId}"
    When the request is processed
    Then the response status should be 200 OK
    And the response body should contain the details of the selected business goal

  Scenario: Client views a BusinessGoal that does not exist
    Given the client sends a GET request to "/businessgoals?id={businessGoalId}"
    When the request is processed
    And the BusinessGoal does not exist
    Then the response status should be 404 Not Found
    And the response body should contain an error message indicating the business goal does not exist