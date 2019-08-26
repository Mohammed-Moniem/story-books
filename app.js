const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");



//passport  config

require("./config/passport")(passport);
//Load routes
const auth = require("./routes/auth");





const app = express();





app.get("/",  (req, res) => {
    res.send("success")
})



// Use routes
app.use("/auth", auth);
const port = process.env.port || 5000;


app.listen(port, () => {
console.log(`server started on port: ${port}`)
});