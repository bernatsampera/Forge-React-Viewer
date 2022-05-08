const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
require('dotenv').config();
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json({ limit: '250mb' }));

const oauth = require("./routes/oauth");
const datamanagement = require("./routes/datamanagement");
const modelderivative = require("./routes/modelderivative");
const designautomation = require("./routes/designautomation");

app.use("/api/oauth", oauth);
app.use("/api/datamanagement", datamanagement);
app.use("/api/modelderivative", modelderivative);
app.use("/api/designautomation", designautomation);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 8000;
app.set("port", port);
const server = app.listen(app.get("port"), function() {
  console.log("Server listening on port " + server.address().port);
});
