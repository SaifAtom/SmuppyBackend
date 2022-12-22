const mongoose = require("mongoose")
const Post = require("../models/post")
const fs = require("fs")



exports.create_post= async (req,res,next)=>{
    const post = new Post({
        _id : new mongoose.Types.ObjectId(),
        content : req.body.content,
        image : req.file.originalname,
        author_id : req.params.author_id
    })
    await post.save()
    .then(
        doc =>{res.status(200).json(doc)}
    )
    .catch(error=>{
        throw error
    })
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
    