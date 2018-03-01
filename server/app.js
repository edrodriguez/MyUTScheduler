var express = require("express");
var path = require("path");

var app = express();
/* serves up index.html from dist */
app.use(express.static(path.join(__dirname,"../dist")));

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(7777,() => { console.log("Started listening on port", 7777); })