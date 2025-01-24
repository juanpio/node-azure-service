Feature: Plan Creation

  Scenario: Client creates a new Plan
    Given the client sends a POST request to "/plans?programId={programId}" with name, description, start, end, budget, maxParticipantPayout, and optionally approvedPartners
    When the request is processed
    Then the response status should be 201 Created
    And the response body should contain the created Plan details

  Scenario: Client tries to create a Plan without a programId
      Given the client sends a POST request to "/plans" without a programId
      When the request is processed
      Then the response status should be 400 Bad Request
      And the response body should contain an error message indicating that the programId is required

  Scenario: Client fails to create a new Plan due to missing required information
    Given the client sends a POST request to "/plans?programId={programId}" without a name
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating that the name is required

  Scenario: Client tries to create a Plan with an invalid date format
    Given the client sends a POST request to "/plans?programId={programId}" with an invalid start date format
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating the date format is invalid

  Scenario: Client tries to create a Plan with a start date after the end date
    Given the client sends a POST request to "/plans?programId={programId}" with a start date after the end date
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating the start date cannot be after the end date

  Scenario: Client tries to create a Plan with a duplicate name
    Given the client sends a POST request to "/plans?programId={programId}" with a name that already exists
    When the request is processed
    And a Plan with the name already exists
    Then the response status should be 409 Conflict
    And the response body should contain an error message indicating the name already exists

  Scenario: Client tries to create a Plan with an excessively long name
    Given the client sends a POST request to "/plans?programId={programId}" with a name longer than 50 characters
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating that the name is too long

  Scenario: Client tries to create a Plan with an excessively long description
    Given the client sends a POST request to "/plans?programId={programId}" with a description longer than 200 characters
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating that the description is too long