const express = require('express');
const router = express.Router()
const { authentication } = require('../Middleware/autenticacion');
const UserController = require('../controllers/UserController');
const { uploadUserImages } = require('../Middleware/multer');

router.post("/create", uploadUserImages.single('imageUser'), UserController.create)
router.post("/login",UserController.login)
router.delete("/logout/:_id",authentication, UserController.logout)
router.delete("/deleteUser/:_id", UserController.deleteUser)
router.get("/getUser", UserController.getUser)
router.get("/getInfo", authentication, UserController.getInfo);
router.put("/updateUser/:_id", authentication, UserController.updateUser)
router.get("/getUserById/:_id", UserController.getUserById);
router.get("/getUserByName/:name", UserController.getUserByName);
router.put('/followers/:_id', authentication, UserController.followers);
router.put('/unfollow/:_id', authentication, UserController.unfollow);
router.get('/confirm/:emailToken',UserController.confirm)

module.exports = router;

