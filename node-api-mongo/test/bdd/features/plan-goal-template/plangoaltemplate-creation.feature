Feature: PlanGoalTemplates Creation

  Scenario: Client creates a new PlanGoalTemplate
    Given the client sends a POST request to "/plangoals/templates" with body containing name, description, category, rule, activityType, kpiIds, and optionally subcategory, eligibility
    When the request is processed
    Then the response status should be 201 Created
    And the response body should contain the created PlanGoalTemplate details

  Scenario: Client fails to create a new PlanGoalTemplate due to missing required information
    Given the client sends a POST request to "/plangoals/templates" without a name
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating that the name is required

  Scenario: Client tries to create a PlanGoalTemplate with a duplicate name
    Given the client sends a POST request to "/plangoals/templates" with a name that already exists
    When the request is processed
    And a PlanGoalTemplate with the name already exists
    Then the response status should be 409 Conflict
    And the response body should contain an error message indicating the name already exists

  Scenario: Client tries to create a PlanGoalTemplate where no KPITemplate exists with kpiId
    Given the client sends a POST request to "/plangoals/templates" with kpiIds that do not exist
    When the request is processed
    And there is no KPI that exists with kpiIds
    Then the response status should be 404 Not Found
    And the response body should contain an error message indicating the kpiIds do not exist

  Scenario: Client tries to create a PlanGoalTemplate with an invalid category
    Given the client sends a POST request to "/plangoals/templates" with an invalid category
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating the category is invalid

  Scenario: Client tries to create a PlanGoalTemplate with an invalid activityType
    Given the client sends a POST request to "/plangoals/templates" with an invalid activityType
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating the activityType is invalid

  Scenario: Client tries to create a PlanGoalTemplate with an invalid eligibility
    Given the client sends a POST request to "/plangoals/templates" with an invalid eligibility
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating the eligibility is invalid
