const Post = require("../models/Post");
const Comment = require("../models/Comment.js");
const User = require("../models/User");

const CommentController = {
  async insertComment(req, res) {
    try {
      const comment = await Comment.create({
        ...req.body,
        userId: req.user._id,
        image: req.file.filename,
      });
      const post = await Post.findByIdAndUpdate(req.body.postId, {
        $push: { comment: comment._id },
      });
      await User.findByIdAndUpdate(req.user._id, {
        $push: { commentIds: comment._id },
      });
      console.log("coment", comment._id);
      res.send({ msg: "Gracias por hacer tu comentario" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "hay un probema con tu comentario" });
    }
  },
  async deleteComment(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(req.params._id, {
        $pull: { comment: { ...req.body, userId: req.user._id } },
      });
      res.send({ message: "has quitado el comentario" });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Hubo un problema al intentar quitar el comentario",
      });
    }
  },
  async updateComent(req, res) {
    try {
      const comment = await Comment.findByIdAndUpdate(
        req.params._id,
        req.body,
        {
          new: true,
        }
      );
      res.send({ message: "comentario actualizado" });
    } catch (error) {
      console.error(error);
    }
  },
  async getAllComment(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const comment = await Comment.find()
        .limit(limit)
        .skip((page - 1) * limit);
      res.send(comment);
    } catch (error) {
      console.error(error);
    }
  },
  async like(req, res) {
    try {
      const existComment = await Comment.findById(req.params._id);
      if (!existComment.likesC.includes(req.user._id)) {
        const comment = await Comment.findByIdAndUpdate(
          req.params._id,
          { $push: { likesC: req.user._id } },
          { new: true }
        );

        await User.findByIdAndUpdate(req.user._id, {
          $push: { likesC: comment._id },
        });
        res.status(400).send({ message: "Gracias por tu like :)" });
      } else {
        res.status(400).send({ message: "Ey ya le has dado like :)" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "hay un problema con tu like" });
    }
  },
  async noLike(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { likesC: req.params._id },
      });
      await Comment.findByIdAndUpdate(req.params._id, {
        $pull: { likesC: req.user._id },
      });
      res.send({ message: "has quitado el like del" });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Hubo un problema al intentar quitar el like",
      });
    }
  },
};

module.exports = CommentController;
