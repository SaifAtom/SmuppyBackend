const express = require("express")
const router = express.Router()
const postController = require("../controllers/post-controller")
const likeController = require("../controllers/post-subcontrollers/likes-controller")

const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 999999999 },
  fileFilter: function(req, file, callback) {
    const allowedTypes = ['image/jpeg', 'image/png'];

    if (!allowedTypes.includes(file.mimetype)) {
      return callback(new Error('Only image files are allowed!'));
    }
    callback(null, true);
  }
});
router.post('/create_post',upload.single('posturl'),postController.create_post)
router.delete('/delete_post/:id',postController.delete_post)
router.patch('/update_post/:id',postController.update_post)
router.get('/posts',postController.getPostsByAuthorId)

//like
router.post('/like_post/:user_id/:post_id',likeController.like)
router.get('/count_likes/:post_id',likeController.countLikes)

module.exports = router