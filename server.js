const express = require("express");
const url = require("url");
const app = express();

app.get('/:TIMESTRING', function(request, response) {
    const query = request.query;
    response.send(request.params);
});

app.listen(8080, function() {
    console.log('Example app listening on port 8080!');
});
