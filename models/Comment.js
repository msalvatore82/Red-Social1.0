const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;
const CommentSchema = new mongoose.Schema(
  {
    comment: String,
    userId: { type: ObjectId, ref: "User" },
    postId: { type: ObjectId, ref: "Post" },
    likesC: [{ type: ObjectId, ref: "User" }],
    image: String
  },
  { timestamps: true }
);

CommentSchema.methods.toJSON = function () {
  const comment = this._doc;
  delete comment.__v;
  return comment;
};

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
