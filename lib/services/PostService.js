
const Post = require('../models/Post');

module.exports = class PostService {

  static async insertPost({ photo, caption, tags }, { username }){
    console.log(photo);
    console.log(caption);
    console.log(tags);
    console.log(username);
    const post = await Post.insert(photo, caption, tags, username);

    return post; 

  }

   
};


