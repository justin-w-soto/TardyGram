const jwt = require('jsonwebtoken');
const pool = require('../utils/pool.js');

module.exports = async (req, res, next) => {
    
    try {
        
        const { rows } = await pool.query(`
        SELECT comment_by as owner
        FROM comments
        WHERE comments.id = $1
        
        `, [req.params.id])  
        if (req.user.username !== rows[0].owner) throw new Error('Unauthorized');
        
      next();
    } catch (error) {
      error.status = 403;
      next(error);
    }


  };
  