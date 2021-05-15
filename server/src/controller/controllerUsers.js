import mongoose from 'mongoose';
import schemaUsers from '../models/modelUsers';
import schemaConfirmation from "../models/modelConfirmation";
const nodemailer = require("../../config/nodemailer.config");


var crypto = require('crypto');

const Users = mongoose.model('Users', schemaUsers);
const Confirmations = mongoose.model('Confirmations', schemaConfirmation);

export function getMe(req, res) {
	res.status(200).json(req.user)
}

export function getUsers(req, res) {
	Users.find({}, (err, user) => {
		if (err) {
			res.status(400).send(err);
		} else {
			res.status(200).json(user);
		}
	});
}

export function getUser(req, res) {
	Users.findById(req.params.id).lean().exec((error, user) => {
		if (error) {
			res.status(404).json(error);
		} else if (user === null) {
			res.status(400).json({error: 'Server was unable to find this User'});
		} else {
			res.status(200).json(user);
		}
	});
}

export function addNewUser(req, res) {

	Users.findOne({email: req.body.email}, function (err, users) {
		if (users) {
			return res.status(400).send('That user already exists!');
		} else {
			users = new Users();
			let confirmation = new Confirmations();

			users.firstName = req.body.firstName;
			users.lastName = req.body.lastName;
			users.email = req.body.email;
			users.username = req.body.username;
			users.confirmed = false;
			users.setPassword(req.body.password);

			users.save((err) => {
				if (err) {
					return res.status(400).send(err);
				}
				// res.send({
					// 	message:
					// 	  "User was registered successfully! Please check your email",
					//  });
					confirmation.user = users._id;
					confirmation.code = crypto.randomBytes(25).toString('hex');
					console.log(confirmation.code);
					confirmation.save((err) => {
						if (err) {
							return res.status(400).send(err);
						}
						console.log(confirmation.code);
						nodemailer.sendConfirmationEmail(
							users.username,
							users.email,
							confirmation.code
						);
						console.log('azea');
					return res.status(201).json(users);
				})
			});
		}
	});
}

export function updateUsers(req, res) {
	Users.findOneAndUpdate({_id: req.params.id}, req.body, {new: true},
		(error, users) => {
			if (error) {
				res.status(400).json(error);
			} else if (users === null) {
				res.status(400).json({error: 'Server was unable to find this user'});
			} else {
				res.status(200).json(users);
			}
		});
}

export function deleteUsers(req, res) {
	Users.deleteOne({_id: req.params.id}, (error, users) => {
		if (error) {
			res.status(404).json(error);
		} else if (users === null) {
			res.status(400).json({error: 'Server was unable to find this users'});
		} else {
			res.status(200).json(users);
		}
	});
}
