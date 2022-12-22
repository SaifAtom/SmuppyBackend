const mongoose = require('mongoose')

const shortSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    media_content : {required : true,type:String},
    author_id : mongoose.Schema.Types.ObjectId
},{timestamps:true})

module.exports = mongoose.model('short',shortSchema)