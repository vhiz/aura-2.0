const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
    },
    profilePic: {
        type: String,
        default: ""
    },
    coverPic: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        max: 60
    },
    website: {
        type: String,

    },
    phoneno: {
        type: Number,
        require: true
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
}, { timestamps: true })

module.exports = model("User", userSchema)