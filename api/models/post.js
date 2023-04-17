const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    numlikes: { required: true, type: String },
    type: { required: true, type: String },
    description: { required: false, type: String },
    posturl: { required: true, type: String },
    sharelink: { required: true, type: String },
    typeofpost: { required: true, type: String },
    reactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reaction' }]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Post', postSchema)
