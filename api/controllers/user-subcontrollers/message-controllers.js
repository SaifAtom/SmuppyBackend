const User = require('./userModel')
const Message = require('./messageModel')
const mongoose = require("mongoose")

exports.sendMessage = async (req, res) => {
    const { senderId, receiverId, message } = req.body
  
    try {
      const sender = await User.findById(senderId).exec()
      const receiver = await User.findById(receiverId).exec()
  
      if (!sender || !receiver) {
        return res.status(404).json({ error: 'User not found' })
      }
  
      const newMessage = new Message({
        sender: sender._id,
        receiver: receiver._id,
        message: message,
      })
  
      await newMessage.save()
  
      sender.messages.push(newMessage._id)
      receiver.messages.push(newMessage._id)
  
      await sender.save()
      await receiver.save()
  
      res.status(200).json(newMessage)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Internal server error' })
    }
  }