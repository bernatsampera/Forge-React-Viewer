const express = require("express");
const Axios = require("axios");

const router = express.Router();

// Get activities
router.get("/activities", (req, res) => {
  const access_token = req.query.access_token;

  Axios({
    method: "GET",
    url: "https://developer.api.autodesk.com/da/us-east/v3/activities",
    headers: {
      Authorization: "Bearer " + access_token
    }
  })
    .then(response => {
      const activities = response.data.data;
      const definedActivities = activities.filter(
        act => act.indexOf("$LATEST") !== -1
      );
      res.json(definedActivities);
    })
    .catch(err => console.log(err));
});

// Get work items
router.get("/workitems", (req, res) => {
  const access_token = req.query.access_token;

  Axios({
    method: "GET",
    url: "GET	https://developer.api.autodesk.com/da/us-east/v3/workitems/",
    headers: {
      Authorization: "Bearer " + access_token
    }
  })
    .then(response => {
      console.log(response);
      res.json(response.data);
    })
    .catch(err => console.log(err));
});

module.exports = router;
