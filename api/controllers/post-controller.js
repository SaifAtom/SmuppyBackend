const mongoose = require("mongoose")
const Post = require("../models/post")
const fs = require("fs")


// Create Post
exports.create_post = async (req, res, next) => {
    try {
        console.log(req.body); // log the request body to the console

        const { type, description, sharelink, typeofpost } = req.body;
        const posturl=req.file.buffer
        const user_id = new mongoose.Types.ObjectId(req.userData.userId)

        const post = new Post({ user_id, type, description, posturl, sharelink, typeofpost });
        await post.save().then((result) => {
                        res.status(201).json({ message: 'Post created successfully', post });
        }).catch((err) => {

        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create post' });
      }
}



exports.delete_post= (req,res)=>{
Post.findByIdAndRemove({_id:req.params.id}).exec().then(
    doc=>{
        try{
            console.log(doc)
            fs.unlinkSync('./api/uploads/posts/'+doc.image)
            res.send('Post removed')
        }
        catch(error){
            console.log(error)
            res.send('error')
        }
    }
)
}

exports.update_post=(req,res)=>{
    const id = req.params.id;
    const updateOps={};
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value
    }
    console.log(updateOps)
    Post.updateMany({_id:id},{$set:updateOps}).exec().then(
       result =>{res.status(200).json(result)}
    ).catch(
        err=>{res.status(500).json(err)}
    )
}

exports.getPostsByAuthorId=async (req, res) => {
    const author_id = req.params.author_id
  
    try {
      const posts = await Post.find({ author_id: author_id }).exec()
      res.status(200).json(posts)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
  