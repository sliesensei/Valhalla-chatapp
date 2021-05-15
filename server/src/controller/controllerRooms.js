import mongoose from 'mongoose';
import schemaRooms from "../models/modelRooms";
import schemaUsers from "../models/modelUsers";

const Rooms = mongoose.model('Rooms', schemaRooms);
const Users = mongoose.model('Users', schemaUsers);

export async function createRoom(req, res) {
	if (!req.user) return res.status(400).json({error: "User isn't logged in."});

	const user = await Users.findById(req.user._id);
	let room = new Rooms();
	room.name = req.body.name;
	room.owner = user;
	room.members = [user];
	room.save((err) => {
		if (err) return res.status(400).send(err);
		return res.status(201).json(room);
	})
}
