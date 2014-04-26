var express = require("express");
var logfmt = require("logfmt");
var gzippo = require("gzippo");
var app = express();

app.use(logfmt.requestLogger());
app.use(gzippo.staticGzip(__dirname + '/public'));

app.get('/', function(req, res) {
  res.redirect("/index.html");
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
