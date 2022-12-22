const express = require("express")
const router = express.Router()
const shortController = require("../controllers/shorts-controller")
const multer = require("multer")
const storage = multer.diskStorage({
    destination : function(req,file,cb){
       cb(null,'api/uploads/shorts');
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

router.post('/create_short/:author_id',upload.single('media_content'),shortController.create_short)
router.delete('/delete_short/:id',shortController.delete_short)

module.exports = router