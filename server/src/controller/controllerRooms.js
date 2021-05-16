import mongoose from 'mongoose';
import schemaRooms from "../models/modelRooms";
import schemaUsers from "../models/modelUsers";
import {error} from "../helpers";

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
	if (!req.user) return error(res, "User isn't logged in.")

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

	if (!promotedUser) return error(res, "Invalid user.")
	if (!room) return error(res, "Invalid room")
	if (room.owner.toString() !== req.user._id.toString()) return error(res, 'You must be the owner to promote someone.');
	if (!room.members.includes(promotedUser._id)) return error(res, "User isn't member of the room.");
	room.owner = promotedUser;
	room = await room.save();
	res.status(200).json(room);
}

export async function leave(req, res) {
	let room = await Rooms.findById(req.body.roomId);

	if (!room.members.includes(req.user._id)) return error(res, "You are not a member of this room.");
	room.members = room.members.filter((el) => {
		console.log(el)
		console.log(req.user._id);
		return el.toString() !== req.user._id.toString();
	});
	await room.save();
	if (room.owner.toString() === req.user._id.toString() && room.members.length > 0) {
		room.owner = room.members[0];
	} else if (room.owner.toString() === req.user._id.toString() && room.members.length === 0) {
		await Rooms.deleteOne({_id: req.body.roomId});
	}
	return res.status(201).json({status: "Success"});
}
