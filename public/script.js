console.log("hello world");

const socket = io();

let username = "";

document.getElementById("join-btn").addEventListener("click", (event) => {
	event.preventDefault();
	username = document.getElementById("username-input").value;
	// console.log(username);
	if (username.trim() != "") {
		document.querySelector("#form-div").style.display = "none";
		document.querySelector(".chatroom-container").style.display = "block";
	} else {
		alert("Please enter a valid username");
		document.getElementById("username-input").value = "";
		document.getElementById("username-input").focus();
	}
});

document.getElementById("send-button").addEventListener("click", (event) => {
	event.preventDefault();
	const data = {
		username: username,
		message: document.getElementById("message-input").value,
	};

	// if "io" is emitting anything then only "sockets" can listen
	// if "sockets" is emitting anything then only "io" can listen
	// io is on the server side
	// socket is on the client side

	//sending message to io because socket is emitting
	socket.emit("message", data);

	//whatever message i am sending i need to show this on ui for user
	addMessageFn(data);
});

// receiving the message
socket.on("message", (data) => {
	//before adding this, just check if you are the sender
	if (data.username !== username) {
		addMessageFnRe(data);
	}
	// addMessageFnRe(data);
});

// working for sent messages
function addMessageFn(data) {
	var msgDiv = document.createElement("div");
	msgDiv.innerText = `${data.username}: ${data.message}`;
	msgDiv.setAttribute("class", "message sent");
	document.getElementById("message-container").appendChild(msgDiv);
	document.getElementById("message-input").value = "";
}

// working for receiving messages
function addMessageFnRe(data) {
	var msgDiv = document.createElement("div");
	msgDiv.innerText = `${data.username}: ${data.message}`;
	msgDiv.setAttribute("class", "message received");
	document.getElementById("message-container").appendChild(msgDiv);
	document.getElementById("message-input").value = "";
}
