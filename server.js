var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

let users = [];
let connections = [];

server.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

app.get("/", function(req, resp) {
    resp.sendFile(__dirname + "/index.html");
});

io.sockets.on("connection", function(socket) {
    connections.push(socket);
    console.log("Connected: %s socket(s) connected", connections.length);

    socket.on("disconnect", function(data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log("Disconnected: %s socket(s) connected", connections.length);
    });

    socket.on("send message", function(data) {
        console.log(data);
        io.sockets.emit("new message", { msg: data });
    });
});
