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

let globalSocket;

export function useGlobalSocket() {
	return { globalSocket, users };
}

const setupSocket = (io) => {
	globalSocket = io;
	io.on('connection', (socket) => {
		users[socket.handshake.query.id] = socket.id;
		console.log(users);

		socket.on('signin', (userId, disconnect) => {
			delete users[socket.handshake.query.id];
			if (disconnect) {
				delete users[userId];
			}
			else {
				users[userId] = socket.id;
			}
		})

		socket.on('message', async (token, roomId, messageContent) => {
			try {
				const user = await auth(token);
				const room = await Rooms.findById(roomId);
				if (!user || !room) return;
				console.log(token, roomId, messageContent)
				let message = new Messages({
					message: messageContent,
					room: room._id,
					user: user._id
				});
				await message.save().catch(e => console.error(e));
				console.log("Message receive from " + user._id + " : " + messageContent + " for " + roomId);
				room.members.forEach((member) => {
					if (!users[member.toString()]) return;
					io.to(users[member.toString()]).emit('message', message);
					console.log("Message sent to " + member.toString());
				});
			} catch (e) {
				console.error(e);
			}
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
