// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// your second API endpoint...
app.get("/api/:date", function (req, res) {
  const dateIn = req.params.date;
  let date = dateIn && isNaN(dateIn) ? new Date(dateIn): new Date(Number(dateIn)) ;
  if (!isValidDate(date)) {
    return res.json({ error: "Invalid Date" });
  }
  const dateInUnixFormat = date.getTime();
  const dateInUtcFormat = date.toUTCString();
  res.json({ unix: dateInUnixFormat, utc: dateInUtcFormat });
});

// your three API endpoint...
app.get("/api", function (req, res) {
  let date = new Date();
  const dateInUnixFormat = date.getTime();
  const dateInUtcFormat = date.toUTCString();
  res.json({ unix: dateInUnixFormat, utc: dateInUtcFormat });
});

function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

// listen for requests :)
// process.env.PORT
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
