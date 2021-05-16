const mongoose = require('mongoose');
const {Schema} = mongoose;

const schemaInvitations = new Schema({
	token: {type: String, required: true},
	room: {type: Schema.Types.ObjectId, required: true},
	user: {type: Schema.Types.ObjectId, required: true}
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}, strict: false});


export default schemaInvitations;
