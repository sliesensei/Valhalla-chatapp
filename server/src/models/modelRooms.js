const mongoose = require('mongoose');
const {Schema} = mongoose;

const schemaRooms = new Schema({
	owner: {type: Schema.Types.ObjectId, ref: 'Users', required: true},
	members: {type: [Schema.Types.ObjectId], ref: 'Users', required: true},
	name: {type: String, required: true}
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}, strict: false});

export default schemaRooms;
