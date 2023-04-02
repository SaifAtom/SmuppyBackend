const express = require('express');
const router = express.Router();

module.exports = function(io) {
  router.post('/sendMessage', (req, res) => {
    const { recipient, message } = req.body;
    const senderSocketId = req.app.get('socketIds')[req.user.id];
    io.to(recipient).emit('message', { message, sender: senderSocketId });
    res.status(200).end();
  });

  router.get('/getMessages/:recipient/:sender', (req, res) => {
    const { recipient, sender } = req.params;
    const messages = io.of('/').adapter.rooms.get(recipient + sender);
    res.status(200).json(Array.from(messages));
  });

  return router;
};
