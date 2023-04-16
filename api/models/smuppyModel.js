const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  birthday: { required: true, type: Date },
  gender: { required: true, type: String },
  phone: { required: false, type: String },
  interest: { required: true, type: String, default: [] },
  image: { required: false, type: String },
  bgimage: { required: false, type: String },
  bio: { required: false, type: String },
  pack: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pack' }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
},{timestamps:true})

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  numlikes : {required: true, type: String},
  type: {required: true, type: String},
  description: {required: false, type: String},
  posturl: {required: true, type: String},
  sharelink: {required: true, type: String},
  typeofpost: {required: true, type: String},
  reactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reaction' }]
},{timestamps:true})

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: String, required: true },
  read: { type: Boolean, default: false }
},{timestamps:true})

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now }
},{timestamps:true})

const reactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, required: true },
  shareUrl: {required: true, type: String},
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
},{timestamps:true})

const eventSchema = new mongoose.Schema({
    title: {required: true, type: String},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    location_id: { required: true, type: Schema.Types.Mixed },
    bgimage: { required: false, type: String },
    description: {required: false, type: String},
    startingAt: {required: true, type: Date},
    endingAt: {required: true, type: Date},
    keywords: {required: true, type: String, default:[]},
    link: {required: true, type: String},
},{timestamps:true})

const packSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
},{timestamps:true})

const User = mongoose.model('User', userSchema)
const Post = mongoose.model('Post', postSchema)
const Notification = mongoose.model('Notification', notificationSchema)
const Message = mongoose.model('Message', messageSchema)
const Reaction = mongoose.model('Reaction', reactionSchema)
const Event = mongoose.model('Event', eventSchema)
const Pack = mongoose.model('Pack', packSchema)

module.exports = {
  User,
  Post,
  Notification,
  Message,
  Reaction,
  Event,
  Pack
}
