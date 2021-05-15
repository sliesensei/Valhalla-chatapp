const mongoose = require('mongoose');
const {Schema} = mongoose;

const schemaConfirmation = new Schema({
	user: {type: Schema.Types.ObjectId, ref: 'Users', required: true},
	code: {type: String, required: true},
	hash: String,
	salt: String,
	expireAt: {
		type: Date,
		default: new Date(new Date().valueOf() + 86400000),
		expires: 86400
	  }
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}, strict: false});

export default schemaConfirmation;
