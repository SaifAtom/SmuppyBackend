const mongoose = require('mongoose')


const  ReactionSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    content: {required: false, type: String},
    typeContent: {required: true, type: String},
    shareUrl: {required: true, type: String},
    typeReaction: {required: true, type: String},
},{timestamps:true})

module.exports = mongoose.model('Reactions',ReactionSchema)