const express = require('express');
const router = express.Router()
const { authentication } = require("../Middleware/autenticacion");
const CommentController = require('../controllers/CommentController');
const { uploadUserImages, uploadCommentImages, uploadPostImages } = require('../Middleware/multer');


router.post("/comment", authentication, uploadCommentImages.single('imageComment'), CommentController.insertComment);
router.delete("/deleteComment/:_id", authentication, CommentController.deleteComment);
router.put("/updateComent/:_id", authentication, CommentController.updateComent)
router.get("/getAllComment", CommentController.getAllComment)
router.put('/likes/:_id', authentication, CommentController.like);
router.put('/noLike/:_id', authentication, CommentController.noLike);


module.exports = router;