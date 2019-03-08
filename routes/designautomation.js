const express = require("express");
const Axios = require("axios");

const router = express.Router();

router.post("/", (req, res) => {
  console.log(req.body.access_token);
});

module.exports = router;
