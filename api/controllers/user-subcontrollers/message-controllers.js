const Message = require('../../models/message')
const mongoose = require('mongoose')

//Send Message to another user
exports.sendMessage = async (req, res) => {
  try {
    const senderId = req.userData.userId
    console.log(senderId)
    const { receiverId, message } = req.body
    console.log(receiverId)

    if (!senderId || !receiverId) {
      return res.status(404).json({ error: 'User not found' })
    }

    const newMessage = await Message.create({
      sender: senderId,
      receiver: receiverId,
      content: message
    })

    res.status(200).json(newMessage)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message || 'Something went wrong' })
  }
}

