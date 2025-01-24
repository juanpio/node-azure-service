Feature: Programs Creation

  Scenario: Client creates a new program
    Given the client sends a POST request to "/programs" with name, description, start date, and optionally end date
    When the request is processed
    Then the response status should be 201 Created
    And the response body should contain the created program details

  Scenario: Client fails to create a new program due to missing required information
    Given the client sends a POST request to "/programs" without a name
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating that the name is required

  Scenario: Client tries to create a program with an invalid date format
    Given the client sends a POST request to "/programs" with an invalid date format
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating the date format is invalid

  Scenario: Client tries to create a program with a start date after the end date
    Given the client sends a POST request to "/programs" with a start date after the end date
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating the start date cannot be after the end date

  Scenario: Client tries to create a program with a duplicate name
    Given the client sends a POST request to "/programs" with a name that already exists
    When the request is processed
    Then the response status should be 409 Conflict
    And the response body should contain an error message indicating the name already exists

  Scenario: Client tries to create a program with an excessively long name
    Given the client sends a POST request to "/programs" with a name longer than 50 characters
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating that the name is too long

  Scenario: Client tries to create a program with an excessively long description
    Given the client sends a POST request to "/programs" with a description longer than 200 characters
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating that the description is too long