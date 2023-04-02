const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    longitude : {required : true,type :String},
    latitude : String,
    altitude : mongoose.Schema.Types.ObjectId,
},{timestamps:true})

module.exports = mongoose.model('Location',locationSchema)