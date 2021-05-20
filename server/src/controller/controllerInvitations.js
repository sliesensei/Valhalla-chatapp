import mongoose from 'mongoose';
import schemaInvitations from "../models/modelInvitations";
import schemaRooms from "../models/modelRooms";
import schemaUsers from "../models/modelUsers";
import { useGlobalSocket } from '../socket';

var crypto = require('crypto');
const Invitations = mongoose.model('Invitations', schemaInvitations);
const Rooms = mongoose.model('Rooms', schemaRooms);
const Users = mongoose.model('Users', schemaUsers);

export async function getInvitations(req, res) {
	const invitations = await Invitations.find({ user: req.user._id });

	return res.status(201).json({ invites: invitations });
}

export async function invite(req, res) {
	const room = await Rooms.findById(req.body.roomId);
	const user = await Users.findOne({ $or: [{ username: req.body.username }, { email: req.body.username }] });
	if (!user || !room) {
		return res.status(404).json({ message: "Unknown  user" })
	}

	if (user._id.toString() === req.user._id.toString()) return res.status(403).json({ message: "Please don't invite yourself." })
	if (!user) return res.status(404).json({ message: "Invalid user." });
	if (!room) return res.status(404).json({ message: "Invalid room." });
	if (room.members.includes(user._id)) return res.status(403).json({ error: "User already joined this room." });

	let invitation = new Invitations({
		roomName: room.name,
		userName: user.username,
		token: crypto.randomBytes(25).toString('hex'),
		room: req.body.roomId,
		user: user._id,
	});

	const socket = useGlobalSocket();
	if (socket) {
		socket.emit('invite');
	}

	//TODO: Envoyer un mail
	invitation = await invitation.save();
	return res.status(201).json(invitation);
}

export async function accept(req, res) {
	let invitation = await Invitations.findOne({ token: req.body.token, user: req.user._id });
	if (!invitation) return res.status(400).json({ error: "Invalid token." });
	let room = await Rooms.findById(invitation.room);
	console.log(invitation);
	if (!room) return res.status(400).json({ error: "Room doesn't exist." });
	if (room.members.includes(req.user._id)) return res.status(400).json({ error: "Room already joined" });

	room.members.push(req.user._id);
	room = await room.save();
	await Invitations.deleteOne({ _id: invitation._id });
	return res.status(201).json(room);
}
