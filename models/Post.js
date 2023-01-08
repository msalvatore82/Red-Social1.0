const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;
const PostSchema = new mongoose.Schema(
  {
    post: {type: String, required: [true, "El post debe tener al menos 15 caracteres"]},
    userId: { type: ObjectId, ref: "User" },
    likes: [{ type: ObjectId }],
    comment: [{ type: ObjectId, ref: "User" }],
    image: String,
  },
  { timestamps: true }
);
PostSchema.methods.toJSON = function () {
  const post = this._doc;
  delete post.__v;
  return post;
};

PostSchema.index({
  name: "text",
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
