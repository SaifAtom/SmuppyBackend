const mongoose = require('mongoose')
const User = require('../../models/user')

//Send Follow request
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

//Get Follow count for a given User
exports.countFollowers = (req, res) => {
  const user_id = new mongoose.Types.ObjectId(req.userData.userId)
  console.log(req.userData)
  User.findById(user_id)
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: 'User not found'
        })
      }
      res.json({
        followers: user.followers.length,
        following: user.following.length
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}


//Get followers of a given User
exports.getFollowers = async (req, res) => {
  const userId = req.userData.userId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;

  try {
    const user = await User.findById(userId).lean().exec();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const totalFollowers = user.followers.length;
    const totalPages = Math.ceil(totalFollowers / limit);

    const followers = [];
    for (const follower of user.followers.slice(startIndex, startIndex + limit)) {
      const userObj = await User.findById(follower._id).select('username email').lean().exec();
      followers.push({
        user: userObj
        // ...
      });
    }
    res.status(200).json({
      followers,
      pagination: {
        page,
        limit,
        totalFollowers,
        totalPages
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}




//Get followings of a given User
exports.getFollowings = async (req, res) => {
  const userId = req.userData.userId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;

  try {
    const user = await User.findById(userId).lean().exec();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const totalFollowings = user.following.length;
    const totalPages = Math.ceil(totalFollowings / limit);

    const followings = [];
    for (const following of user.following.slice(startIndex, startIndex + limit)) {
      const userObj = await User.findById(following._id).select('username email').lean().exec();
      followings.push({
        user: userObj
        // ...
      });
    }
    res.status(200).json({
      followings,
      pagination: {
        page,
        limit,
        totalFollowings,
        totalPages
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

