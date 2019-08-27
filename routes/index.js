const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Story = mongoose.model("stories");
const { ensureAuthenticated, ensureGuest } = require("../helpers/auth");
//Home
router.get("/", ensureGuest, (req, res) => {
  res.render("index/welcome");
});

//Dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  //getting stories of the loggedin user
  Story.find({ user: req.user.id }).then(stories => {
    res.render("index/dashboard", { stories: stories });
  });
});

//About
router.get("/about", (req, res) => {
  res.render("index/about");
});
module.exports = router;
