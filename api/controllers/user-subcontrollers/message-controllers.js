const Message = require('../../models/message')
const mongoose = require("mongoose")

exports.sendMessage = async (req, res) => {
    const { senderId, receiverId, message } = req.body
  
    try {

  
      if (!sender || !receiver) {
        return res.status(404).json({ error: 'User not found' })
      }
  
      const newMessage = new Message({
        sender: senderId,
        receiver: receiverId,
        message: message,
      })
  
      await newMessage.save()

  
      res.status(200).json(newMessage)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Internal server error' })
    }
  }