Feature: PlanGoals Viewing

  Scenario: Client views the details of a specific PlanGoal
    Given the client sends a GET request to "/plangoals?id={planGoalId}"
    When the request is processed
    Then the response status should be 200 OK
    And the response body should contain the details of the selected plan goal

  Scenario: Client views a PlanGoal that does not exist
    Given the client sends a GET request to "/plangoals?id={planGoalId}"
    When the request is processed
    And the PlanGoal does not exist
    Then the response status should be 404 Not Found
    And the response body should contain an error message indicating the plan goal does not exist