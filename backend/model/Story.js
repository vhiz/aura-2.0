const { Schema, model } = require("mongoose");


const storiesSchema = new Schema({
    img:{
        type: String
    },
    userId:{
        type: String
    }
},{timestamps: true})


module.exports = model('Story', storiesSchema)