const mongoose = require('mongoose')
const User = require('../../models/user')

exports.follow = (req, res) => {
  const followed_id = new mongoose.Types.ObjectId(req.body.followed_id)
  const follower_id = new mongoose.Types.ObjectId(req.body.follower_id)
  User.find({ _id: followed_id })
    .then(result => {
      var followers = result[0].followers
      followers.push(follower_id)
      User.updateOne({ _id: followed_id }, { $set: { followers: followers } })
        .then(doc => {
          User.find({ _id: follower_id }).then(result => {
            var followed = result[0].following
            followed.push(followed_id)
            User.updateOne(
              { _id: follower_id },
              { $set: { following: followed } }
            )
              .then(doc => {
                res.status(200).json({ response: 'followed successfuly' })
              })
              .catch(error => {
                res.send(error)
              })
          })
        })
        .catch(error => {
          console.log(error)
        })
    })
    .catch(error => {
      console.log(error)
    })
}

exports.countFollowers = (req, res) => {
  const user_id = new mongoose.Types.ObjectId(req.params.id)
  User.find({ _id: user_id })
    .then(doc => {
      res.json({
        followers: doc[0].followers.length,
        following: doc[0].following.length
      })
    })
    .catch(err => {
      console.log(err)
    })
}

exports.getFollowers = async (req, res) => {
  const userId = req.params.userId

  try {
    const user = await User.findById(userId).populate('followers').exec()

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const followers = user.followers
    res.status(200).json(followers)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}
