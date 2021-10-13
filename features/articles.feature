Feature: Read article related to sports

Background:
Given setup the environment details

Scenario: Use the search option to find all articles related to ‘sports’. Output the first heading and the last heading returned on the page.
Given the user is on Football Scores & Fixtures page
When the user enters the keyword sports and click search
Then the user should be displayed search result page
And output the first and last heading of the article 