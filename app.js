const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const mongoose  = require("mongoose");
const config = require('./config/database');

mongoose.connect(config.database);
mongoose.connection.on('connected',()=>{
    console.log("Connected to database : "+config.database);
});
mongoose.connection.on('error',(err)=>{
    console.log("Error Connecting to database :"+err);
});
const app = express();
const users = require("./routs/users");

const port = 3000;
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(bodyParser.json());

app.use("/users",users);

app.listen(port,()=>{
    console.log("server started on port "+port);
});