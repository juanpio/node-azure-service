Feature: Programs Viewing

  Scenario: Client views the details of a specific program
    Given the client sends a GET request to "/programs?id={programId}"
    When the request is processed
    Then the response status should be 200 OK
    And the response body should contain the details of the selected program

  Scenario: Client views a program that does not exist
    Given the client sends a GET request to "/programs?id={programId}"
    When the request is processed
    And the program does not exist
    Then the response status should be 404 Not Found
    And the response body should contain an error message indicating the program does not exist