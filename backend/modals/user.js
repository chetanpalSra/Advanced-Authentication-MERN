const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    lastLogin:{
        type: Date,
        default: Date.now,
    },
    isVerified:{ // user account is verified or not.
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,


},{timestamps: true}); 

const User = mongoose.model('user',userSchema);

module.exports = User;