const mongoose = require('mongoose')
const Schema = mongoose.Schema

const packSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: {required: true, type: String},
    image: { required: true, type: String },
    description: {required: true, type: String},
    image: { required: true, type: String },
    prix: { required: true, type: String }

  },
  { timestamps: true }
)

module.exports = mongoose.model('Pack', packSchema)
