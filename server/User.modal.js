const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    phone_number: { type: String, required: true }
},
    { timestamps: true, collection: 'data' });

module.exports = mongoose.model('User', UserSchema);