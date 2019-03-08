var express = require("express");
var Axios = require("axios");
const querystring = require("querystring");
const keys = require("../config/forge");

var router = express.Router();

router.post("/", (req, res) => {
  const client_id = req.body.client_id || keys.FORGE_CLIENT_ID;
  const client_secret = req.body.client_secret || keys.FORGE_CLIENT_SECRET;

  console.log(client_id);

  if (!(client_id && client_secret)) {
    res.status(5000).json({ msg: "Credentials where not provided" });
  }

  var scopes =
    "data:read data:write data:create bucket:create bucket:read code:all";

  Axios({
    method: "POST",
    url: "https://developer.api.autodesk.com/authentication/v1/authenticate",
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    data: querystring.stringify({
      client_id: client_id,
      client_secret: client_secret,
      grant_type: "client_credentials",
      scope: scopes
    })
  })
    .then(function(response) {
      access_token = response.data.access_token;
      expires_in = response.data.expires_in;
      res.json({ access_token, expires_in });
    })
    .catch(function(err) {
      res.send("Failed To authenticate");
    });
  // res.json({access_token: '' });
});

router.get("/public", function(req, res) {
  // Limit public token to Viewer read only
  Axios({
    method: "POST",
    url: "https://developer.api.autodesk.com/authentication/v1/authenticate",
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    data: querystring.stringify({
      client_id: keys.FORGE_CLIENT_ID,
      client_secret: keys.FORGE_CLIENT_SECRET,
      grant_type: "client_credentials",
      scope: "viewables:read"
    })
  })
    .then(function(response) {
      // Success
      // console.log(response);
      res.json({
        access_token: response.data.access_token,
        expires_in: response.data.expires_in
      });
    })
    .catch(function(error) {
      // Failed
      console.log(error);
      res.status(500).json(error);
    });
});

module.exports = router;
