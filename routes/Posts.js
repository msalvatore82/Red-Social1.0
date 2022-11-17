const express = require('express');
const router = express.Router()
const { authentication } = require("../Middleware/autenticacion");
const {  uploadPostImages } = require('../Middleware/multer');




const PostController = require('../controllers/PostController');

router.post("/createPostByUser/",authentication, uploadPostImages.single('imagePost'), PostController.createPostByUser)
router.delete("/deletePost/:_id",authentication, PostController.deletePost)
router.put("/updatePost/:_id",authentication, PostController.updatePost)
router.get("/getAll/",authentication, PostController.getAll)
router.get("/getPostById/:_id",authentication, PostController.getPostById)
router.get("/getPostByName/:title", PostController.getPostByName)
router.put('/like/:_id', authentication, PostController.like);
router.put('/nolikes/:_id', authentication, PostController.noLike);
router.delete("/deleteAllPost", PostController.deleteAllPost)


module.exports = router;
