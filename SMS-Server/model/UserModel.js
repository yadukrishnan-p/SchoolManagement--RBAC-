const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: { type: String, ref: 'User', required: true },
    name: { type: String, required: true },
    profilePic: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'office_staff', 'librarian'] },
    resetPasswordToken: { type: String },
    resetPasswordExpiry: { type: Date },
    isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', UserSchema);