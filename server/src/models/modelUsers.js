const mongoose = require('mongoose');
var crypto = require('crypto');
const {Schema} = mongoose;

const schemaUsers = new Schema({
	firstName: {type: String},
	lastName: {type: String},
	username: {type: String, required: true},
	email: {type: String, required: true},
	confirmed: Boolean,
	hash: String,
	salt: String,
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}, strict: false});

schemaUsers.methods.setPassword = function (password) {

	this.salt = crypto.randomBytes(16).toString('hex');

	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
};

schemaUsers.methods.validPassword = function (password) {
	const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
	return this.hash === hash;
};

export default schemaUsers;
