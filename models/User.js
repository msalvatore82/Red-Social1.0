const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Tienes que completar tu Nombre"] },
    email: {
      type: String,
      match: [/.+\@.+\..+/, "Este correo no es válido"],
      unique: true,
      required: [true, "Por favor rellena tu correo"],
    },
    password: {
      type: String,
      required: [true, "Tienes que completar el campo Password"],
    },
    genero: {
      type: String,
      required: [true, "Tienes que completar el campo Genero"],
    },
    tokens: [],
    role: { type: String, default: "user" },
    postIds: [{ type: ObjectId, ref: "Post" }],
    commentIds: [{ type: ObjectId, ref: "Comment" }],
    likes: [{ type: ObjectId, ref: "Post" }],
    likesC: [{ type: ObjectId, ref: "Comment" }],
    followers: [{ type: ObjectId, ref: "User" }],
    confirmed: Boolean,
    seguidos: [{ type: ObjectId, ref: "User" }],
    image: String
  
  },
  { timestamps: true }
);
UserSchema.methods.toJSON = function () {
  const user = this._doc;
  delete user.tokens;
  delete user.password;
  delete user.__v;
  return user;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;

