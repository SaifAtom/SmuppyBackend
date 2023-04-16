const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')



const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    username: { required: true, type: String },
    email: { required: true, type: String },
    password: { required: true, type: String },
    birthday: { required: true, type: Date },
    gender: { required: true, type: String },
    phone: { required: false, type: String },
    interest: { required: true, type: String, default:[] },
    image: { required: false, type: String },
    bgimage: { required: false, type: String },
    bio: { required: false, type: String },
    pack: {
      required: true,
      type: [mongoose.Schema.Types.ObjectId],
      default: []
    },
    verified: {
      type: Boolean,
      required: true,
      default: false
    },
    verificationCode: {
      type: String,
      required: true,
      default: 'Mycode'
    },
    followers: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    following: { type: [mongoose.Schema.Types.ObjectId], default: [] }
  },
  { timestamps: true }
)

userSchema.methods.generateVerificationCode = function () {
  var result = ''
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < charactersLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

module.exports = mongoose.model('User', userSchema)
