
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

  static async getPostById(id){
    const singlePost = await Post.fetchPostById(id);

    return singlePost;
  }
  
  static async patchPostById(id, { caption }){
    const singlePost = await Post.patchById(id, caption);

    return singlePost;
  }

  static async deletePostById(id){
    const singlePost = await Post.deleteById(id);

    return singlePost;
  }
   
};


