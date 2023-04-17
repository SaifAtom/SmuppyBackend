const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    birthday: { required: true, type: Date },
    gender: { required: true, type: String },
    phone: { required: false, type: String },
    interest: { required: true, type: String },
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
