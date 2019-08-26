const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.get("/",  (req, res) => {
    
})

const port = process.env.port || 5000;


app.listen(port, () => {
console.log(`server started on port: ${port}`)
});