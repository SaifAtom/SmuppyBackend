const mongoose = require("mongoose")
const Post = require("../../models/post")


exports.like = (req,res)=>{
    const user_id = new mongoose.Types.ObjectId(req.param.user_id)
    const post_id = new mongoose.Types.ObjectId(req.params.post_id)
    Post.find({_id:post_id})
    .then(
        post =>{
            var postLikes=post[0].likes
            postLikes.push(user_id)
            Post.updateOne({_id:post_id},{$set:{likes:postLikes}})
            .then(
                result => {res.send("liked")}                
            )
            .catch(
                err => { console.log(err)}
            )
        }
    )
    .catch(
        err => { console.log(err)}
    )
}

exports.countLikes = (req,res) =>{
    const post_id = new mongoose.Types.ObjectId(req.params.post_id)
    Post.find({_id:post_id}).then(
        doc => {
            res.status(200).json({
                likeCounter: doc[0].likes.length 
            })
        }
    )
    .catch(
        err => {console.log(err)}
    )
}