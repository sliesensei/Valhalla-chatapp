const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schemaToken = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'Users', required: true},
    token: {
        type: String,
        required: true,
    },
	expireAt: {
		type: Date,
		default: Date.now,
		expires: 1200
	}
});

export default schemaToken;