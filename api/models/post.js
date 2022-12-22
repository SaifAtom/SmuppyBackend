const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    content : {required : true,type :String},
    image : String,
    author_id : mongoose.Schema.Types.ObjectId,
    likes : {type:[mongoose.Schema.Types.ObjectId],default:[]}
},{timestamps:true})

module.exports = mongoose.model('Post',postSchema)