const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { ensureAuthenticated, ensureGuest } = require("../helpers/auth");

//Load Story model
const Story = mongoose.model("stories");

//Load User model
const User = mongoose.model("users");

//Stories Index
router.get("/", (req, res) => {
  res.render("stories/index");
});

//Add Stories
router.get("/add", ensureAuthenticated, (req, res) => {
  res.render("stories/add");
});

//Process add stories
router.post("/", (req, res) => {
  let allowComments;

  if (req.body.allowComments) {
    allowComments = true;
  } else {
    allowComments = false;
  }

  // Building the story object from the story add form
  const newStory = {
    title: req.body.title,
    body: req.body.body,
    status: req.body.status,
    allowComments: allowComments,
    user: req.user.id
  };

  //Create Story
  new Story(newStory).save().then(story => {
    res.redirect(`/stories/show/${story.id}`);
  });
});
module.exports = router;
