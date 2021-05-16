import mongoose from 'mongoose';
import schemaRooms from "../models/modelRooms";
import schemaUsers from "../models/modelUsers";

const Rooms = mongoose.model('Rooms', schemaRooms);
const Users = mongoose.model('Users', schemaUsers);

export async function getRooms(req, res) {
	Rooms.find({}, (err, rooms) => {
		if (err) {
			res.status(400).send(err);
		} else {
			res.status(200).json(rooms);
		}
	});
}

export async function getMyRooms(req, res) {
	const rooms = await Rooms.find({$or: [{owner: req.user}, {members: req.user}]});
	return res.status(201).json(rooms);
}

export async function createRoom(req, res) {
	if (!req.user) return res.status(400).json({error: "User isn't logged in."});

	let room = new Rooms();
	room.name = req.body.name;
	room.owner = req.user;
	room.members = [req.user];

	room.save((err) => {
		if (err) {
			return res.status(400).send(err);
		}
		return res.status(201).json(room);
	})
}

export async function promoteUser(req, res) {
	const promotedUser = await Users.findById(req.body.userId);
	let room = await Rooms.findById(req.body.roomId);

	if (!promotedUser) return res.status(400).json({error: "Invalid user."});
	if (!room) return res.status(400).json({error: 'Invalid Room.'});
	if (room.owner.toString() !== req.user._id.toString()) return res.status(400).json({error: 'You must be the owner to promote someone.'});
	if (!room.members.includes(promotedUser._id)) return res.status(400).json({error: "User isn't member of the room."});
	room.owner = promotedUser;
	room = await room.save();
	res.status(200).json(room);
}
