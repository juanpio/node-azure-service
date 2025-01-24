Feature: BusinessGoalTemplates Creation

  Scenario: Client creates a new BusinessGoalTemplate
    Given the client sends a POST request to "/businessgoals/templates" with body containing name, description, category, unitOfMeasure, type, metric, kpiTemplateId, and optionally aiDescription
    When the request is processed
    Then the response status should be 201 Created
    And the response body should contain the created BusinessGoalTemplate details

  Scenario: Client fails to create a new BusinessGoalTemplate due to missing required information
    Given the client sends a POST request to "/businessgoals/templates" without a name
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating that the name is required

  Scenario: Client tries to create a BusinessGoalTemplate where no kpiTemplate exists with kpiTemplateId
    Given the client sends a POST request to "/businessgoals/templates" with invalid KPIs
    When the request is processed
    And there is no kpiTemplate that exists with kpiTemplateId
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating the KPIs are invalid

  Scenario: Client tries to create a BusinessGoalTemplate with an invalid category
    Given the client sends a POST request to "/businessgoals/templates" with an invalid category
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating the category is invalid

  Scenario: Client tries to create a BusinessGoalTemplate with a duplicate name
    Given the client sends a POST request to "/businessgoals/templates" with a name that already exists
    When the request is processed
    And a BusinessGoalTemplate with the name already exists
    Then the response status should be 409 Conflict
    And the response body should contain an error message indicating the name already exists

  Scenario: Client tries to create a BusinessGoalTemplate with an invalid unitOfMeasure
    Given the client sends a POST request to "/businessgoals/templates" with an invalid unitOfMeasure
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating the unitOfMeasure is invalid

  Scenario: Client tries to create a BusinessGoalTemplate with an invalid kpiType
    Given the client sends a POST request to "/businessgoals/templates" with an invalid kpiType
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating the kpiType is invalid

  Scenario: Client tries to create a BusinessGoalTemplate with an invalid kpiMetric
    Given the client sends a POST request to "/businessgoals/templates" with an invalid kpiMetric
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating the kpiMetric is invalid