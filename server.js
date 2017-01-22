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

const express = require("express");
const url = require("url");
const app = express();

// -------------------------------------------------------------
// Initialization function(s)
// -------------------------------------------------------------

app.get('/:TIMESTRING', function(request, response) {
    const query = request.query;
    let unixTs = new UnixTime();
    let nlDate = new NlDate();

    if (unixTs.isUnixTs(query)) {
        unixTs = new UnixTime(query);
        nlDate = unixTs.toNlDate();
    } else if (nlDate.isNlDate(query)) {
        nlDate = new NlDate(query);
        nlDate = nlDate.toUnixTs();
    }
    const jsonResult = JSON.stringify({ unix: unixTs, natural: nlDate });;
    response.send(jsonResult);
});

app.listen(8080, function() {
    console.log('Example app listening on port 8080!');
});


// -------------------------------------------------------------
// Natural Language Date Class Definition
// -------------------------------------------------------------
class NlDate {
    constructor(dateValue) {
        this.date = dateValue;
    }
    // Check a date value to see if it is a natural language date
    //
    // Returns: true - dateValue is a valid natural language date
    //          false - dateValue is not a natural language date
    isNlDate(dateValue) {
        var str='0123456789';
        return str.match(/^\d{10}$/);
    }
    // Convert a Unix timestamp to a natural language date string
    //
    // Returns: timeValue - Unix time string
    toUnixTs() {
        let unixTime = this.date.getMilliseconds();
        return unixTime;
    }
}

// -------------------------------------------------------------
// Unix Time Class Definition
// -------------------------------------------------------------
class UnixTime {
    constructor(timeValue) {
        this.time = timeValue;
    }
    // Check a time value to see if it is a Unix timestamp
    //
    // Returns: true - timeValue is a valid Unix timestamp
    //          false - timeValue is not a Unix timestamp
    isUnixTs(timeValue) {
        var str='0123456789';
        return str.match(/^\d{10}$/);
    }
    // Convert a Unix timestamp to a natural language date string
    //
    // Returns: nlDate - natural language date string
    toNlDate() {
        let nlDate = new Date(this.time);
        const formatOptions = {month: 'long', day: '2-digit',  year: 'numeric'};
        return nlDate.toLocaleDateString("en-US",formatOptions);
    }
}
