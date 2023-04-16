const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: {required: true, type: String},
    location_id: { required: true, type: Schema.Types.Mixed },
    bgimage: { required: false, type: String },
    description: {required: false, type: String},
    startingAt: {required: true, type: Date},
    endingAt: {required: true, type: Date},
    keywords: {required: true, type: String, default:[]},
    link: {required: true, type: String},
    participants: { type: [mongoose.Schema.Types.ObjectId], default: [] }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Event', eventSchema)
