var express = require("express");
var Axios = require("axios");
const querystring = require("querystring");
const forge_client = require("../config/forge");
var store = require("store");
var router = express.Router();

router.post("/buckets", (req, res) => {
  const access_token = req.body.access_token;
  console.log(req.body);
  Axios({
    method: "GET",
    url: "https://developer.api.autodesk.com/oss/v2/buckets",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + access_token
    }
  })
    .then(function(response) {
      // Success
      res.json({ success: true, data: response.data });
    })
    .catch(function(error) {
      // Failed
      //console.log(error);
      res.json({ success: false, message: "Failed to get buckets" });
    });
});

router.post("/create", function(req, res, next) {
  const access_token = req.body.access_token;
  const bucketKey = req.body.bucketKey;
  const policyKey = req.body.policyKey;

  Axios({
    method: "POST",
    url: "https://developer.api.autodesk.com/oss/v2/buckets",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + access_token
    },
    data: JSON.stringify({
      bucketKey: bucketKey,
      policyKey: policyKey
    })
  })
    .then(function(response) {
      // Success
      res.json({ success: true });

      //Follow with detail implementation here
    })
    .catch(function(error) {
      if (error.response && error.response.status == 409) {
        console.log("Bucket already exists, skip creation.");
        res.json({ success: false, message: "Bucket already exists" });
      }
      // Failed
      console.log(error);
      res.send("Failed to create a new bucket");
      res.json({ success: false, message: "Failed to create new bucket" });
    });
});

router.post("/detail", function(req, res) {
  const access_token = req.body.access_token;
  const bucketKey = req.body.bucketKey;
  console.log(this.bucketKey);
  Axios({
    method: "GET",
    url:
      "https://developer.api.autodesk.com/oss/v2/buckets/" +
      encodeURIComponent(bucketKey) +
      "/details",
    headers: {
      Authorization: "Bearer " + access_token
    }
  })
    .then(function(response) {
      // Success
      console.log(response);
      res.json({ success: true, data: response.data });
    })
    .catch(function(error) {
      // Failed
      console.log(error);
      res.json({ message: "Failed to verify the new bucket" });
    });
});

var Buffer = require("buffer").Buffer;
String.prototype.toBase64 = function() {
  // Buffer is part of Node.js to enable interaction with octet streams in TCP streams,
  // file system operations, and other contexts.
  return new Buffer(this).toString("base64");
};

var multer = require("multer"); // To handle file upload
var upload = multer({ dest: "tmp/" }); // Save file into local /tmp folder

// Route /api/forge/datamanagement/bucket/upload
router.post("/upload", upload.single("fileToUpload"), function(req, res) {
  const bucketKey = req.body.bucketKey;
  const access_token = req.body.access_token;
  var fs = require("fs"); // Node.js File system for reading files
  fs.readFile(req.file.path, function(err, filecontent) {
    Axios({
      method: "PUT",
      url:
        "https://developer.api.autodesk.com/oss/v2/buckets/" +
        encodeURIComponent(bucketKey) +
        "/objects/" +
        encodeURIComponent(req.file.originalname),
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Disposition": req.file.originalname,
        "Content-Length": filecontent.length
      },
      data: filecontent
    })
      .then(function(response) {
        // Success
        console.log(response.data);
        var urn = response.data.objectId.toBase64();
        res.json({ success: true, urn: urn });
      })
      .catch(function(error) {
        // Failed
        res.json({ success: false, message: "Failed uploading a model" });
      });
  });
});

// Route /model/delete
//developer.api.autodesk.com/oss/v2/buckets/:bucketKey/objects/:objectName
router.post("/model/delete", function(req, res) {
  const bucketKey = req.body.bucketKey;
  const access_token = req.body.access_token;
  const filename = req.body.filename;

  Axios({
    method: "DELETE",
    url:
      "https://developer.api.autodesk.com/oss/v2/buckets/" +
      encodeURIComponent(bucketKey) +
      "/objects/" +
      encodeURIComponent(filename),
    headers: {
      Authorization: "Bearer " + access_token
    }
  })
    .then(function(response) {
      res.json({ success: true });
    })
    .catch(function(error) {
      // Failed
      //   console.log(error);
      res.json({ success: false, message: "Failed Deleting a model" });
    });
});

router.post("/models", function(req, res) {
  const access_token = req.body.access_token;
  const bucketKey = req.body.bucketKey;

  console.log(this.bucketKey);
  Axios({
    method: "GET",
    url:
      "https://developer.api.autodesk.com/oss/v2/buckets/" +
      encodeURIComponent(bucketKey) +
      "/objects",
    headers: {
      Authorization: "Bearer " + access_token
    }
  })
    .then(function(response) {
      // Success
      console.log(response.data);
      res.json({ success: true, data: response.data });
    })
    .catch(function(error) {
      // Failed
      res.json({ success: false, message: "Failed to verify the new bucket" });
    });
});

module.exports = router;
