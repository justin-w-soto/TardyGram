const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth.js');
// const UserService = require('../services/UserService');
const PostService = require('../services/PostService');
// const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router() 
  .get('/', async (req, res, next) => {
    try { 
      console.log('ALLL GET ONE');
      const allPosts = await PostService.getAllPosts();
      res.send(allPosts);
    } catch (error) {
      next(error); 
    }
  })
  .post('/', ensureAuth, async (req, res, next) => {
    try {
    //   console.log(req);
    //   console.log('USERNAME--->', req.user.username);
      // req => need user
    //   console.log("THE REQ A", req);
    //   console.log("THE REQ B", req.user);

      const post = await PostService.insertPost(req.body, req.user);

      res.send(post);

    } catch (error) {
      next(error); 
    }
  });
