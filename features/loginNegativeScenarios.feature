Feature: Verify all negative scenarios for login

Background:
Given setup the environment details


Scenario Outline: Verify whther the application throws proper error message when entering invalid email
Given the user is on Football Scores & Fixtures page
And the user clicks sign in button
When user enters email as "<email>"
Then user should see the error message as "<scenario>" for invalid email
Examples:
| email        | scenario        |
|              | Empty           |
| a            | tooShort    |
| ac.ac        | invalidUsername |
| *****        | SpecialSymbols  |
| ac@ac@ac.com | invalidEmail    |


Scenario Outline: Verify whther the application throws proper error message when entering invalid password
Given the user is on Football Scores & Fixtures page
And the user clicks sign in button
When user enters password as "<password>"
Then user should see the error message as "<scenario>" for invalid password
Examples:
| password  | scenario    |
|           | Empty       |
| a         | tooShort    |
| abcdeefgh | onlyLetters |
| 12345678  | onlyNumbers |
| ********* | onlySpecial |
| 12345**** | noLetter    |


Scenario Outline: Verify whther the application throws proper error message for login failure with invalid inputs
Given the user is on Football Scores & Fixtures page
And the user clicks sign in button
When user enters email as "<email>"
And user enters password as "<password>"
And click Sign in
Then user should be displayed with proper error for the scenario "<scenario>"

Examples:
| email   | password    | scenario        |
| t@t.com | pass1234    | NoAccount       |
| test1   | password12  | invalidPassword |