const mongoose = require('mongoose');
const {Schema} = mongoose;

const schemaMessages = new Schema({
	message: {type: String, required: true},
	room: {type: Schema.Types.ObjectId, required: true},
	user: {type: Schema.Types.ObjectId, required: true}
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}, strict: false});

export default schemaMessages;
