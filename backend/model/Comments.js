const { Schema, model } = require("mongoose");


const commentSchema = new Schema({
    desc: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
    postId: {
        type: String,
        require: true
    }
}, { timestamps: true })

module.exports = model('Comments', commentSchema)