var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var cors = require("cors");

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var oauth = require("./routes/oauth");
var datamanagement = require("./routes/datamanagement");
var modelderivative = require("./routes/modelderivative");
var designautomation = require("./routes/designautomation");

app.use("/api/oauth", oauth);
app.use("/api/datamanagement", datamanagement);
app.use("/api/modelderivative", modelderivative);
app.use("/api/designautomation", designautomation);

app.set("port", 3000);
var server = app.listen(app.get("port"), function() {
  console.log("Server listening on port " + server.address().port);
});
