const mongoose = require('mongoose')

const reactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, required: true },
    shareUrl: { required: true, type: String },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Reaction', reactionSchema)
