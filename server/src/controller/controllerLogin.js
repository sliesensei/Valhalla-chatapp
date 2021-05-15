import mongoose from 'mongoose';
import schemaUsers from '../models/modelUsers';

const jwt = require('jsonwebtoken');
const config = require('../../config/default.json');

const Users = mongoose.model('Users', schemaUsers);

export function Login(req, res) {
	let filters = {};
	if (req.body.email) {
		filters.email = req.body.email;
	} else if (req.body.username) {
		filters.username = req.body.username;
	}
	Users.findOne(filters, function (err, user) {
		if (user === null) {
			return res.status(400).send({
				message: "User not found."
			});
		} else if (user.confirmed === false) {
			return res.status(400).send({error: "Confirm email before login"});
		} else {
			if (user.validPassword(req.body.password)) {
				const payload = {
					id: user._id
				};
				jwt.sign(payload, config.JWT_SECRET, {expiresIn: 3600},
					(err, token) => {
						if (err) {
							return res.status(400).send(err)
						}
						return res.status(200).json({
							token: token
						});
					}
				);
			} else {
				return res.status(400).send({
					message: "Wrong Password"
				});
			}
		}
	});
}
