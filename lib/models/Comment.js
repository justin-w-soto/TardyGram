const pool = require('../utils/pool');


module.exports = class Comment {

  constructor(row){

    this.id = row.id;
    this.comment_by = row.comment_by;
    this.post = row.post;
    this.comment = row.comment;
   
  }

  static async insert(username, id, comment){

    const { rows } = await pool.query(
      'INSERT INTO comments (comment_by, post, comment) VALUES($1, $2, $3) RETURNING *', [username, id, comment]
    );
    return new Comment(rows[0]);
  }
};
