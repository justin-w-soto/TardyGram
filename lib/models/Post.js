
const pool = require('../utils/pool');


module.exports = class Post {

  constructor(row){

    this.id = row.id;
    this.photo = row.photo_url;
    this.caption = row.caption;
    this.tags = row.tags;
    this.user = row.user; //if not work, user is in quotes in DB

  }

  static async insert(photo, caption, tags, user){
    // console.log('PhotoURL', photo);
    // console.log('Caption', caption);
    // console.log('TAGS', tags);
    // console.log('POST// USER', user);
    const { rows } = await pool.query(`
    
    INSERT INTO posts
    (photo_url, caption, tags, "user")
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `, [photo, caption, tags, user]);
  

    return new Post(rows[0]);

  }
  //---------------------------------------------//
  static async getAll(){
    const { rows } =  await pool.query(
      'SELECT * FROM posts'
    );
    return rows.map(row => new Post(row));
  }

  //---------------------------------------------//

  static async fetchPostById(id){
  
    const { rows } = await pool.query(`
 
SELECT post, comment, comment_by
FROM posts
RIGHT JOIN comments
ON posts.id = comments.post
  WHERE comments.post = $1

    `, [id]
    );
    console.log('ROWS ROWS', rows);
    return rows;

  }

  //---------------------------------------------//






};


 
