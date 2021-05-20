import mongoose from 'mongoose';
import schemaMessages from "../models/modelMessages";
import schemaRooms from "../models/modelRooms";
import { error } from "../helpers";

const Messages = mongoose.model('Messages', schemaMessages);
const Rooms = mongoose.model('Rooms', schemaRooms);

export async function getRoomMessages(req, res) {
	const room = await Rooms.findById(req.params.roomId);

	if (!room) return error(res, "Invalid Room id.");
	if (!room.members.includes(req.user._id)) return error(res, "You are not member of this room.");

	Messages.find({ room: room._id }).sort({ date: 'asc' }).then((messages) => {
		return res.status(201).json(messages);
	});
}
