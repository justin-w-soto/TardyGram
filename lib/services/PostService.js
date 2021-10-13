
const Post = require('../models/Post');

module.exports = class PostService {

  static async insertPost({ photo, caption, tags }, { username }){
   
    const post = await Post.insert(photo, caption, tags, username);

    return post; 

  }

  static async getAllPosts(){
    const allPosts = await Post.getAll();
    return allPosts;
  }
   
};


