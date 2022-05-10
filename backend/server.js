const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI

mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb connection established");
})

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const notesRouter = require("./routes/notes");

app.use("/", notesRouter);

app.listen(port, function() {
    console.log(`Server started on port: ${port}`);
});
