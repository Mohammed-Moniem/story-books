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
  Story.find({ status: "public" })
    .populate("user")
    .then(stories => {
      res.render("stories/index", { stories: stories });
    });
});

//Show Single Story
router.get("/show/:id", (req, res) => {
  Story.findOne({
    _id: req.params.id
  })
    .populate("user")
    .then(story => {
      res.render("stories/show", { story: story });
    });
});

//Add Stories
router.get("/add", ensureAuthenticated, (req, res) => {
  res.render("stories/add");
});

//Edit Stories
router.get("/edit/:id", ensureAuthenticated, (req, res) => {
  Story.findOne({
    _id: req.params.id
  }).then(story => {
    res.render("stories/edit", { story: story });
  });
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

//Edit Form Process
router.put("/:id", (req, res) => {
  Story.findOne({
    _id: req.params.id
  }).then(story => {
    let allowComments;

    if (req.body.allowComments) {
      allowComments = true;
    } else {
      allowComments = false;
    }

    //New values
    story.title = req.body.title;
    story.body = req.body.body;
    story.status = req.body.status;
    story.allowComments = allowComments;

    story.save().then(story => {
      res.redirect("/dashboard");
    });

    res.render("stories/edit", { story: story });
  });
});

//Delete Story
router.delete("/:id", (req, res) => {
  Story.remove({ _id: req.params.id }).then(() => {
    res.redirect("/dashboard");
  });
});
module.exports = router;
