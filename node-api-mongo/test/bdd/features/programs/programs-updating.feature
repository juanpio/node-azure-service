Feature: Programs Updating

  Scenario: Client updates a program successfully
    Given the client sends a PATCH request to "/programs?id={programId}" with updated name, description, start date, or end date
    When the request is processed
    Then the response status should be 200 OK
    And the response body should contain the updated program details

  Scenario: Client tries to update a program that does not exist
    Given the client sends a PATCH request to "/programs?id={programId}" for a non-existent program
    When the request is processed
    And the program does not exist
    Then the response status should be 404 Not Found
    And the response body should contain an error message indicating that the program does not exist

  Scenario: Client tries to update a program with an invalid date format
    Given the client sends a PATCH request to "/programs?id={programId}" with an invalid date format
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating the date format is invalid

  Scenario: Client tries to update a program with a start date after the end date
    Given the client sends a PATCH request to "/programs?id={programId}" with a start date after the end date
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating the start date cannot be after the end date

  Scenario: Client tries to update a program with the same name as another program
    Given the client sends a PATCH request to "/programs?id={programId}" with a name
    When the request is processed
    And another program exists with the same name
    Then the response status should be 409 Conflict
    And the response body should contain an error message indicating a program with the name already exists

  Scenario: Client tries to update a program with an excessively long name
    Given the client sends a PATCH request to "/programs?id={programId}" with a name longer than 50 characters
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating that the name is too long

  Scenario: Client tries to update a program with an excessively long description
    Given the client sends a PATCH request to "/programs?id={programId}" with a description longer than 200 characters
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating that the description is too long