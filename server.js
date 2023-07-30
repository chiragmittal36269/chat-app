// console.log('test');

// import express from the node-modules package and store it in the express variable.
const express = require("express");

// make an express application
// here app will the data which was returned by express function.
const app = express();

//server requires a protocol so we use 'http' to add the app on that protocol
// we integrate my app that we got from the express and this app will work on http protocol
// making server using http and express
const server = require("http").Server(app);

// it will pick index.html present inside the public folder and open it on localhost:9000
app.use(express.static("public"));

// integrating socket.io with the server
const io = require("socket.io")(server);

//server will be having io
io.on("connection", (socket) => {
	console.log("connection established", socket.id);

	// socketA send the data to io
	// io send the data to socketB

	// socketA user is triggering the message event
	socket.on("message", (data) => {
		// user is sending message
		io.emit("message", data); //emitting this message to all other sockets
	});

	//showing that the user left the chat room
	socket.on("disconnect", () => {
		console.log(socket.id, "-> left the chat");
	});
});

const PORT = 9000;

server.listen(PORT, () => {
	console.log(`Server is running on PORT ${PORT}`);
});
