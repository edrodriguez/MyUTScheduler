var express = require("express");
var path = require("path");

var app = express();
/* serves up index.html from dist */
app.use(express.static(path.join(__dirname,"../dist")));
app.listen(7777,function(){
    console.log("Started listening on port", 7777); /* Make this port 8081 maybe */
})