Feature: Make a record of all teams which are playing today

Background:
Given setup the environment details

Scenario: Output all team names with a match today. If there are no matches today, output a message to convey this.
Given the user is on Football Scores & Fixtures page
When the user seeing todays Scores & Fixtures
Then the user should be able to see all the team names with a match today
