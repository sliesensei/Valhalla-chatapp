import mongoose from 'mongoose';
import schemaUsers, {OAuth} from '../models/modelUsers';

const Users = mongoose.model('Users', schemaUsers);

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

			users.firstName = req.body.firstName;
			users.lastName = req.body.lastName;
			users.email = req.body.email;
			users.setPassword(req.body.password);
		}

		users.save((err) => {
			if (err) {
				res.status(400).send(err);
			} else {
				res.status(201).json(users);
			}
		});
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

export function addOAuth(req, res) {
	const auth = mongoose.model(req.body.service, OAuth);
	let newAuth = new auth();
	newAuth.accessToken = req.body.accessToken;
	newAuth.refreshToken = req.body.refreshToken;
	newAuth.expiryDate = req.body.expiryDate;
	newAuth.clientId = req.body.clientId;
	newAuth.clientSecret = req.body.clientSecret;
	newAuth.id = req.body.id;
	let update = {
		[req.body.service]: newAuth
	};

	Users.findOneAndUpdate({_id: req.params.id}, update, {new: true},
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