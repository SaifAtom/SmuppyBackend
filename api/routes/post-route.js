const express = require("express")
const router = express.Router()
const postController = require("../controllers/post-controller")
const likeController = require("../controllers/post-subcontrollers/likes-controller")
const multer = require("multer")
const storage = multer.diskStorage({
    destination : function(req,file,cb){
       cb(null,'api/uploads/posts');
    },
    filename : function(req,file,cb){
        cb(null,file.originalname);
    }
})
const filefilter = (req,file,cb)=>{
    if(file.mimeType==='Image/jpeg' || file.mimeType==='Image/png'){
        cb(null,false);
    }
    else{cb(null,true)}
}
const upload = multer({storage:storage,fileFilter:filefilter})


router.post('/create_post/:author_id',upload.single('image'),postController.create_post)
router.delete('/delete_post/:id',postController.delete_post)
router.patch('/update_post/:id',postController.update_post)
router.get('/posts',postController.getPostsByAuthorId)

//like
router.post('/like_post/:user_id/:post_id',likeController.like)
router.get('/count_likes/:post_id',likeController.countLikes)

module.exports = router