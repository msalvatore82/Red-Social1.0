const User = require("../models/User.js");
const Post = require("../models/Post.js");
const Comment = require("../models/Comment.js");

const PostController = {
  async createPostByUser(req, res, next) {
    try {
      const post = await Post.create({
        ...req.body,
        userId: req.user._id,
        image: req.file?.filename,
      });
      await User.findByIdAndUpdate(req.user._id, {
        $push: { postIds: post._id },
      });

      res.status(201).send(post);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Ha habido un problema creando el Post", error });
      next(error);
    }
  },
  async deletePost(req, res) {
    try {
      const post = await Post.findByIdAndDelete(req.params._id);
      res.send({ message: "Post eliminado", post });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Ha habido un problema creando el Post",
      });
    }
  },
  async updatePost(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
                req.params._id,
                { ...req.body,  userId: req.user._id},
                {
                  new: true,
                }
            );
      res.send({ message: "Post actualizado con exito" });
    } catch (error) {
      console.error(error);
    }
  },
  async getAll(req, res) {
    try {
      // const { page = 1, limit = 10 } = req.query;
      const post = await Post.find().sort({createdAt: -1})
      .populate({ path: 'comment', model: Comment, })
      .populate({
        path: 'userId',
        select: 'name -_id'
    })
        // .limit(limit)
        // .skip((page - 1) * limit);
      res.send(post);
    } catch (error) {
      console.error(error);
    }
  },
  async getPostById(req, res) {
    try {
      const post = await Post.findById(req.params._id)
      .populate({ path: 'comment', model: Comment, })
      .populate({
        path: 'userId',
        select: 'name -_id'
    })
      res.send({ message: "Tu post", post });
    } catch (err) {
      res.status(500).send({ msg: "Tu post no existe", err });
    }
  },
  async getPostByName(req, res) {
    try {
      if (req.params.title.length > 20) {
        return res.status(400).send("Búsqueda demasiado larga");
      }
      const title = new RegExp(req.params.title, "i");
      const post = await Post.find({ title });
      res.send(post);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        msg: "Ha habido un problema al buscar el post",
        error,
      });
    }
  },
  async like(req, res) {
    try {
      const existPost = await Post.findById(req.params._id);
      if (!existPost.likes.includes(req.user._id)) {
        const post = await Post.findByIdAndUpdate(
          req.params._id,
          { $push: { likes: req.user._id } },
          { new: true }
        );

        await User.findByIdAndUpdate(req.user._id, {
          $push: { likes: post._id },
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
      await Post.findByIdAndUpdate(req.params._id, {
        $pull: { likes: req.user._id },
      });
      res.send({ message: "has quitado el like" });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Hubo un problema al intentar quitar el like",
      });
    }
  },
  async deleteAllPost(req, res) {
    try {
      const post = await Post.deleteMany();
      res.send({ message: "Posts eliminado" });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Hay un problema al eliminar el post",
      });
    }
  },
};
module.exports = PostController;
