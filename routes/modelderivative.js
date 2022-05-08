var express = require("express");
var Axios = require("axios");
const querystring = require("querystring");
const forge_client = require("../config/forge");
const fs = require("fs");
var router = express.Router();

var Buffer = require("buffer").Buffer;
String.prototype.toBase64 = function() {
  // Buffer is part of Node.js to enable interaction with octet streams in TCP streams,
  // file system operations, and other contexts.
  // return new Buffer(this).toString("base64");
  return new Buffer.from(this).toString("base64")
};

router.post("/convert", function(req, res) {
  var urn = req.body.urn;
  var urn = urn.toBase64();

  const access_token = req.body.access_token;

  var format_type = "svf";
  var format_views = ["2d", "3d"];

  Axios({
    method: "POST",
    url: "https://developer.api.autodesk.com/modelderivative/v2/designdata/job",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + access_token
    },
    data: JSON.stringify({
      input: {
        urn: urn
      },
      output: {
        formats: [
          {
            type: format_type,
            views: format_views
          }
        ]
      }
    })
  })
    .then(function(response) {
      // Success
      res.json({ succes: true, data: response.data });
      // res.redirect('/viewer.html?urn=' + urn);
    })
    .catch(function(error) {
      // Failed
      //console.log(error);
      res.json({ success: false, message: "Failed converting a model" });
    });
});

router.get("/treeInfo", function(req, res) {
  var urn = req.query.urn;
  var urn = urn.toBase64();

  const access_token = req.query.access_token;

  Axios({
    method: "GET",
    url:
      "https://developer.api.autodesk.com/modelderivative/v2/designdata/" +
      urn +
      "/metadata",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + access_token
    }
  })
    .then(function(response) {
      res.json({ succes: true, data: response.data.data.metadata });
      // res.redirect('/viewer.html?urn=' + urn);
    })
    .catch(function(error) {
      // Failed
      //console.log(error);
      res.json({
        succes: false,
        message: "Failed getting tree info",
        errorMessage: error.message
      });
    });
});

router.get("/objectInfo", function(req, res) {
  var urn = req.query.urn;
  var urn = urn.toBase64();
  var guid = req.query.guid;

  const access_token = req.query.access_token;

  console.log(`urn: ${urn}`);
  console.log(`guid: ${guid}`);

  Axios({
    method: "GET",
    url:
      "https://developer.api.autodesk.com/modelderivative/v2/designdata/" +
      urn +
      "/metadata/" +
      guid,
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + access_token
    }
  })
    //validate response is not 202
    .then(function(response) {
      // Success
      // console.log(response);
      res.json({
        success: true,
        data: response.data.data.objects,
        status: response.data.status
      });
      // res.redirect('/viewer.html?urn=' + urn);
    })
    .catch(function(error) {
      // Failed
      console.log(error);
      res.json({ succes: false, message: "Failed converting a model" });
    });
});

module.exports = router;
