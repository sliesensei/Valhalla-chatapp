import mongoose from 'mongoose';
import schemaUsers from '../models/modelUsers';

const jwt = require('jsonwebtoken');
const config = require('../../config/default.json');

const Users = mongoose.model('Users', schemaUsers);

export function Login(req, res) {
	let filters = { $or: [{ username: req.body.username }, { email: req.body.username }] };
	Users.findOne(filters, function (err, user) {
		if (user === null) {
			return res.status(404).send({
				message: "User not found."
			});
		} else if (user.confirmed === false) {
			return res.status(403).send({ message: "Confirm email before login" });
		} else {
			if (user.validPassword(req.body.password)) {
				const payload = {
					id: user._id
				};
				jwt.sign(payload, config.JWT_SECRET, { expiresIn: 3600 },
					(err, token) => {
						if (err) {
							return res.status(500).send(err)
						}
						return res.status(200).json({
							token: token,
							userId: user._id,
							message: 'Successfully Connected'
						});
					}
				);
			} else {
				return res.status(403).json({
					message: "Wrong Password"
				});
			}
		}
	});
}
