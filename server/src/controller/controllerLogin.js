import mongoose from 'mongoose';
import schemaUsers from '../models/modelUsers';

const Users = mongoose.model('Users', schemaUsers);

export function Login(req, res) {
	Users.findOne({email: req.body.email, username: req.body.username}, function (err, user) {
		if (user === null) {
			return res.status(400).send({
				message: "User not found."
			});
		} else if (user.confirmed === false) {
			return res.status(400).send({error : "Confirm email before login"});
		} else {
			if (user.validPassword(req.body.password)) {
				return res.status(201).send({
					message: "User Logged In",
					user: user._id
				})
			} else {
				return res.status(400).send({
					message: "Wrong Password"
				});
			}
		}
	});
}
