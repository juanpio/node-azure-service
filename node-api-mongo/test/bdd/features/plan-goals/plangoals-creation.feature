Feature: PlanGoals Creation

  Scenario: Client creates a new PlanGoal
    Given the client sends a POST request to "/plangoals?planId={planId}" with body containing templateId, start, end, activityTarget, incentive
    When the request is processed
    Then the response status should be 201 Created
    And the response body should contain the created PlanGoal details

  Scenario: Client fails to create a new PlanGoal due to missing required information
    Given the client sends a POST request to "/plangoals?planId={planId}" without a templateId
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating that the templateId is required

  Scenario: Client tries to create a PlanGoal where no template exists with templateId
    Given the client sends a POST request to "/plangoals?planId={planId}" with a templateId that does not exist
    When the request is processed
    And there is no PlanGoalTemplate that exists with the templateId
    Then the response status should be 404 Not Found
    And the response body should contain an error message indicating the templateId does not exist

  Scenario: Client tries to create a PlanGoal with an invalid date format
    Given the client sends a POST request to "/plangoals?planId={planId}" with an invalid start date format
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating the date format is invalid

  Scenario: Client tries to create a PlanGoal with a start date after the end date
    Given the client sends a POST request to "/plangoals?planId={planId}" with a start date after the end date
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating the start date cannot be after the end date

  Scenario: Client tries to create a PlanGoal with an invalid incentive
    Given the client sends a POST request to "/plangoals?planId={planId}" with an invalid incentive
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating the incentive is invalid