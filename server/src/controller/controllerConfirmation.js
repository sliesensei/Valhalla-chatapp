import mongoose from 'mongoose';
import schemaUsers from '../models/modelUsers';
import schemaConfirmation from "../models/modelConfirmation";

const Users = mongoose.model('Users', schemaUsers);
const Confirmations = mongoose.model('Confirmations', schemaConfirmation);

export function getConfirms(req, res) {
	Confirmations.find({}, (err, confirms) => {
		if (err) {
			res.status(400).send(err);
		} else {
			res.status(200).json(confirms);
		}
	});
}

export function confirm(req, res) {
	Confirmations.findOne({code: req.params.code}, (err, confirm) => {
		if (!confirm) {
			return res.status(400).send("Confirmation code not found.");
		} else {
			Users.findOneAndUpdate({_id: confirm.user}, {confirmed: true}, {},
				(error, users) => {
					if (error || users === null) {
						res.status(400).json(error);
					} else {
						confirm.delete();
						res.status(200).json(users);
					}
				});
		}
	})
}
