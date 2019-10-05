const express = require("express");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const io = require("socket.io");
const routes = require("./routes");

var PORT = process.env.PORT || 3000;
var app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
}

// Connect to the Mongo DB
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/ecobourne",
    {
        useNewUrlParser: true,
        useCreateIndex: true
    }
    );
    
app.use(routes);

app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

///////////////////////////////////////////
//Socket Stuff
///////////////////////////////////////////

var users = [];
//Connects
io.on("connection", function(socket) {
  console.log("a user connected");

  //Sends a chat message
  socket.on("chat message", function(msg) {
    console.log("My Chat Message listener", msg);

    io.emit("chat message", msg);
  });
  //Deals with user name
  socket.on("send-nickname", function(nickname) {
    socket.nickname = nickname;
    users.push(socket.nickname);
    console.log(users);
  });
  //Shows that user disconnects
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});
