const Comment = require('../models/Comment');

module.exports = class CommentService {
  static async insertComment({ id, comment }, { username }){

    const newComment = await Comment.insert(username, id, comment);

    return newComment;
  }
};
