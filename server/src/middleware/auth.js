import mongoose from "mongoose";

const jwt = require("jsonwebtoken");
const config = require('../../config/default.json');
import schemaUsers from '../models/modelUsers';

const Users = mongoose.model('Users', schemaUsers);

module.exports = async function (req, res, next) {
	//if (!res.headers || !res.headers.authorization) return res.status(401).json({error: "User isn't logged in."});
	const token = req.headers.authorization.split(' ')[1];
	if (!token) return res.status(401).json({message: "Auth Error"});

	try {
		const decoded = jwt.verify(token, config.JWT_SECRET);
		const user = Users.findById(decoded.user.id);
		if (!user) return res.status(401).json({message: "Auth Error"});
		req.user = user;
		next();
	} catch (e) {
		console.error(e);
		res.status(500).send({message: "Invalid Token"});
	}
};
