const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    numlikes : {required: true, type: String},
    type: {required: true, type: String},
    description: {required: false, type: String},
    posturl: {required: true, type: String},
    sharelink: {required: true, type: String},
    typeofpost: {required: true, type: String},
},{timestamps:true})

module.exports = mongoose.model('Post',postSchema)