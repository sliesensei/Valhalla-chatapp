const mongoose = require('mongoose');
const {Schema} = mongoose;

const schemaConfirmation = new Schema({
	user: {type: [Schema.Types.ObjectId], ref: 'Users', required: true},
	code: {type: String, required: true},
	hash: String,
	salt: String,
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}, strict: false});

export default schemaConfirmation;
