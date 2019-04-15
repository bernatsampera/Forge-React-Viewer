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
router.post("/workitems", (req, res) => {
  const access_token = req.query.access_token;

  const activity = req.body.activity;
  const bucketKey = req.body.bucketKey;
  const filename = req.body.filename;

  const activityName = activity.slice(0, activity.indexOf("+"));

  const aliase = "test";

  const activityId = `${activityName}+${aliase}`;

  console.log(`activityName: ${activityId}\n
  bucketKey: ${bucketKey}\n
  filename: ${filename.slice(0, filename.indexOf("."))}.txt`);

  Axios({
    method: "POST",
    url: "https://developer.api.autodesk.com/da/us-east/v3/workitems",
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "application/json"
    },
    data: {
      activityId: activityId,
      arguments: {
        inputFile: {
          url: `https://developer.api.autodesk.com/oss/v2/buckets/${bucketKey}/objects/${filename}`,
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        },
        inputJson: {
          url:
            "data:application/json, {'walls': true,'floors':true,'doors':true,'windows':true}"
        },
        outputTxt: {
          url: `https://developer.api.autodesk.com/oss/v2/buckets/${bucketKey}/objects/${Date.now() /
            1000}${filename.slice(0, filename.indexOf("."))}.txt`,
          headers: {
            Authorization: `Bearer ${access_token}`
          },
          verb: "put"
        }
        //,
        // onComplete: {
        //   url: 'https://c552e218.ngrok.io/api/forge/callback/designautomation?id=2dWfbFxtMFyWTODhSdwdBg&bucketKey=react_viewer_transient&outputFileName=20190408120020_rst_basic_sample_project.txt',
        //   verb: 'post'
        // }
      }
    }
  })
    .then(response => {
      console.log(response);
      res.json(response.data);
    })
    .catch(err => console.log(err));
});

router.post("/modelinfo", (req, res) => {
  const access_token = req.query.access_token;

  const { bucketKey, objectKey } = req.body;

  Axios({
    method: "GET",
    url: `https://developer.api.autodesk.com/oss/v2/buckets/${bucketKey}/objects/${objectKey}`,
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
    .then(response => {
      console.log(response.data);
      res.json(response.data);
    })
    .catch(err => console.log(err));
});

module.exports = router;
