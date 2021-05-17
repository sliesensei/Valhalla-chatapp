import mongoose from "mongoose";

const jwt = require("jsonwebtoken");
const config = require('../config/default.json');
import schemaUsers from './models/modelUsers';
import schemaRooms from "./models/modelRooms";
import schemaMessages from "./models/modelMessages";

const Users = mongoose.model('Users', schemaUsers);
const Rooms = mongoose.model('Rooms', schemaRooms);
const Messages = mongoose.model('Messages', schemaMessages);
let users = {};

const setupSocket = (io) => {
	io.on('connection', (socket) => {
		users[socket.handshake.query.id] = socket.id;
		console.log(users);

		socket.on('message', async (token, roomId, messageContent) => {
			const user = await auth(token);
			const room = await Rooms.findById(roomId);
			if (!user || !room) return;
			let message = new Messages();
			message.message = messageContent;
			message.room = room._id;
			message.user = user._id;
			await message.save();
			console.log("Message receive from " + user._id + " : " + messageContent + " for " + roomId);
			room.members.forEach((member) => {
				if (!users[member.toString()]) return;
				io.to(users[member.toString()]).emit('message', user._id, roomId, messageContent);
				console.log("Message sent to " + member.toString());
			});
		});

		socket.on("disconnect", () => {
			delete users[socket.handshake.query.id];
		});
	});
}

async function auth(token) {
	try {
		const decoded = jwt.verify(token, config.JWT_SECRET);
		const user = await Users.findById(decoded.id);
		if (!user) return null
		return user
	} catch (e) {
		console.error(e);
		return null
	}
}

export default setupSocket;
