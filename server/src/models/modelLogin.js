const mongoose = require('mongoose');

const { Schema } = mongoose;


const schemaLogin = new Schema({
  email: { type: String, required: true },
  hash: { type: String },
  salt: { type: String }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, strict: false });

export default schemaLogin;