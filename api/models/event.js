const mongoose = require('mongoose')
const location = require('./location')

const eventSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    content : {required : true,type :String},
    title : String,
    author_id : mongoose.Schema.Types.ObjectId,
    location_id : {type:mongoose.Schema.Types.ObjectId}
},{timestamps:true})

module.exports = mongoose.model('Event',eventSchema)

