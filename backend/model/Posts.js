const { Schema, model } = require("mongoose");

const postsSchema = new Schema({
    userId: {
        type: String,
        
    },
    desc: {
        type: String,
        max: 600
    },
    img: {
        type: String
    },
    likes: {
        type: Array,
        default: []
    }
},{timestamps: true})

module.exports = model('Posts', postsSchema)