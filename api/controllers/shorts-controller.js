const mongoose = require("mongoose")
const Short = require("../models/short")
const fs = require("fs")


exports.create_short= async (req,res,next)=>{
    const short = new Short({
        _id : new mongoose.Types.ObjectId(),
        media_content : req.file.originalname,
        author_id : req.params.author_id
    })
    await short.save()
    .then(
        doc =>{res.status(200).json(doc)}
    )
    .catch(error=>{
        throw error
    })
}

exports.delete_short= (req,res)=>{
    Short.findByIdAndRemove({_id:req.params.id}).exec().then(
        doc=>{
            try{
                console.log(doc)
                fs.unlinkSync('./api/uploads/shorts/'+doc.media_content)
                res.send('Short removed')
            }
            catch(error){
                console.log(error)
                res.send('error')
            }
        }
    )
    }