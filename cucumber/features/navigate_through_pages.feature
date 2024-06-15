Feature: User can navigate through character pages

  Scenario: Finding some cheese
    Given user navigates to "http://localhost:5173/"
    When clicking next page
    Then the page should contain "Anakin Skywalker"
