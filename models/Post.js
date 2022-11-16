const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;


const PostSchema = new mongoose.Schema({
userId: {type: ObjectId,ref: "User",},    
title: {type: String, required: [true, "Tienes que completar el title"]} ,
post: {type: String, required: [true, "El post debe tener al menos 15 caracteres"]} ,
likes: [{ type: ObjectId }],
comment : [{ type: ObjectId, ref: 'User' }],
image: String
}, 
{ timestamps: true });
PostSchema.methods.toJSON = function() {
    const post = this._doc;
    delete post.createdAt;
    delete post.updatedAt;
    delete post.__v;
    return post;
    
    }


PostSchema.index({

name: "text",

});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;

