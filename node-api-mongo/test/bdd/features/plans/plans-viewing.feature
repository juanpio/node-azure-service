Feature: Plans Viewing

  Scenario: Client views the details of a specific Plan
    Given the client sends a GET request to "/plans?id={planId}"
    When the request is processed
    Then the response status should be 200 OK
    And the response body should contain the details of the selected plan

  Scenario: Client views a Plan that does not exist
    Given the client sends a GET request to "/plans?id={planId}"
    When the request is processed
    And the Plan does not exist
    Then the response status should be 404 Not Found
    And the response body should contain an error message indicating the plan does not exist