const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: false },
    email: { type: String, required: false },
    password: { type: String, required: true },
    birthday: { required: false, type: Date },
    gender: { required: false, type: String },
    phone: { required: false, type: String },
    interest: { required: false, type: String },
    image: { required: false, type: String },
    bgimage: { required: false, type: String },
    bio: { required: false, type: String },
    verified: {required: true, type: Boolean, default: false},
    pack: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pack' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: false }
)
userSchema.methods.generateVerificationCode = function() {
  var result = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < charactersLength; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
  charactersLength));
 }
  return result;
};

module.exports = mongoose.model('User', userSchema)
