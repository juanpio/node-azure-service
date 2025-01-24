Feature: BusinessGoals Creation

  Scenario: Client creates a new BusinessGoal
    Given the client sends a POST request to "/businessgoals" with body containing templateId, start, end, kpiTemplateIds, and optionally target, primaryKpiId
    When the request is processed
    Then the response status should be 201 Created
    And the response body should contain the created BusinessGoal details

  Scenario: Client fails to create a new BusinessGoal due to missing required information
    Given the client sends a POST request to "/businessgoals" without a templateId
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating that the templateId is required

  Scenario: Client tries to create a BusinessGoal with an invalid date format
    Given the client sends a POST request to "/businessgoals" with an invalid start date format
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating the date format is invalid

  Scenario: Client tries to create a BusinessGoal with a start date after the end date
    Given the client sends a POST request to "/businessgoals" with a start date after the end date
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating the start date cannot be after the end date

  Scenario: Client tries to create a BusinessGoal where no kpiTemplate exists with kpiTemplateId
    Given the client sends a POST request to "/businessgoals/templates" with invalid KPIs
    When the request is processed
    And there is no kpiTemplate that exists with kpiTemplateId on the BusinessGoalTemplate
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating the KPIs are invalid