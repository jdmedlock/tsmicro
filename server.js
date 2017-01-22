// File name: server.js
// Date: 01/21/2017
// Programmer: Jim Medlock
//
// freeCodeCamp Backend Certificate API Project - Timestamp Microservice
//
// 1. User Story: I can pass a string as a parameter, and it will check to
//    see whether that string contains either a unix timestamp or a natural
//    language date (example: January 1, 2016).
// 2. User Story: If it does, it returns both the Unix timestamp and the
//    natural language form of that date.
// 3. User Story: If it does not contain a date or Unix timestamp, it returns
//    null for those properties.
//
// ##Example usage:
//    https://timestamp-ms.herokuapp.com/December%2015,%202015
//    https://timestamp-ms.herokuapp.com/1450137600
//
// ##Example output:
//    { "unix": 1450137600, "natural": "December 15, 2015" }
"use strict";
const express = require("express");
const moment = require("moment");
const path = require('path');
const url = require("url");
const app = express();

// -------------------------------------------------------------
// Express UI function(s)
// -------------------------------------------------------------

app.get("/", function(request, response) {
    response.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/:TIMESTRING", function(request, response) {
    const query = request.params.TIMESTRING;
    let tsMicroService = new TsMicroService(query);

    const jsonResult = JSON.stringify({
      unix: tsMicroService.unixTs,
      natural: tsMicroService.nlDate
    });
    response.send(JSON.stringify({
      unix: tsMicroService.unixTs,
      natural: tsMicroService.nlDate
    }));
});

app.listen(8080, function() {
    console.log("Timestamp Microservice app listening on port 8080!");
});


// -------------------------------------------------------------
// Timestamp Microservice Class Definition
// -------------------------------------------------------------
class TsMicroService {
    // Construct a new TsMicroService object instance. The input
    // value will be checked to see if it is a Unix timestamp or
    // a natural language date string. Unique class variables
    // will be initialized to contain both, with the unknown value
    // being constructed from the known value.
    //
    // For example, if a natural language date is passed the Unix
    // timestamp will be constructed from it and vice versa.
    //
    // If an invalid value is passed both class variables will be
    // set to null.
    //
    // Returns: New object instance
    constructor(inputValue) {
        this.nlDate = null;
        this.unixTs = null;

        if (this.isNlDate(inputValue)) {
           this.nlDate = inputValue;
           this.unixTs = this.toUnixTs();
        } else if (this.isUnixTs(inputValue)) {
           this.unixTs = Number(inputValue);
           this.nlDate = this.toNlDate();
        }
    }
    // Check an input value to see if it is a natural language date
    //
    // Returns: true - dateValue is a valid natural language date
    //          false - dateValue is not a natural language date
    isNlDate(inputValue) {
        const date = moment(inputValue, "MMMM D, YYYY", true);
        return date.isValid();
    }
    // Check an input value to see if it is a Unix timestamp
    //
    // Returns: true - timeValue is a valid Unix timestamp
    //          false - timeValue is not a Unix timestamp
    isUnixTs(inputValue) {
      const timestamp = moment(inputValue, "x", true);
      return timestamp.isValid();
    }
    // Convert a Unix timestamp to a natural language date string
    //
    // Returns: date - natural language date string
    toNlDate() {
        const date = moment(this.unixTs).format("MMMM DD, YYYY");
        return date;
    }
    // Convert a Unix timestamp to a natural language date string
    //
    // Returns: timeValue - Unix time string
    toUnixTs() {
      const timestamp = moment(this.nlDate).format("x");
      return timestamp;
    }
}
