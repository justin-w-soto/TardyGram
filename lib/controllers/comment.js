const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth.js');
const CommentService = require('../services/CommentService.js');


module.exports = Router() 
  .post('/', ensureAuth, async (req, res, next) => {
    try {    
      console.log('EVON', req.body);
      const comment = await CommentService.insertComment(req.body, req.user);
      res.send(comment);
    
    } catch (error) {
      next(error); 
    }
  });
