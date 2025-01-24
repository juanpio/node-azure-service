Feature: Programs Deletion

  Scenario: Client deletes a program successfully
    Given the client sends a DELETE request to "/programs?id={programId}"
    When the request is processed
    Then the response status should be 200 OK
    And the response body should contain a message indicating the program was deleted successfully

  Scenario: Client tries to delete a program that does not exist
    Given the client sends a DELETE request to "/programs?id={programId}" for a non-existent program
    When the request is processed
    And the program does not exist
    Then the response status should be 404 Not Found
    And the response body should contain an error message indicating the program does not exist

  Scenario: Client tries to delete a program without providing an ID
    Given the client sends a DELETE request to "/programs" without an ID
    When the request is processed
    Then the response status should be 400 Bad Request
    And the response body should contain an error message indicating that the program ID is required