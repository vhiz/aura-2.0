const {model, Schema } = require('mongoose')


const relationshipSchema =  new Schema({
    followerUserId:{
        type:String
    },
    followedUserId:{
        type: String
    }
}, {timestamps: true})

module.exports = model('Relationships', relationshipSchema)