#freeCodeCamp Backend Certificate API Project - Timestamp Microservice

##Objective

Build a full stack JavaScript app that is functionally similar to this: https://timestamp-ms.herokuapp.com/ and deploy it to Heroku. Note that for each project, you should create a new GitHub repository and a new Heroku project. If you can't remember how to do this, revisit https://freecodecamp.com/challenges/get-set-for-our-api-development-projects.

##User Stories

Implement the following users stories in this exercise.

1. User Story: I can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016).
2. User Story: If it does, it returns both the Unix timestamp and the natural language form of that date.
3. User Story: If it does not contain a date or Unix timestamp, it returns null for those properties.

##Example usage:
```
https://powerful-tundra-83297.herokuapp.com/December%2015,%202015
https://powerful-tundra-83297.herokuapp.com/1450137600
```
##Example output:
```
{ "unix": 1450137600, "natural": "December 15, 2015" }
```
