const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth.js');
// const UserService = require('../services/UserService');
const PostService = require('../services/PostService');
// const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router() 
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
  })
  .get('/', async (req, res, next) => {
    try { 
      console.log('ALLL GET ONE');
      const allPosts = await PostService.getAllPosts();
      res.send(allPosts);
    } catch (error) {
      next(error); 
    }
  })

  .get('/:id', async (req, res, next) => {
    try { 
      const getSinglePost = await PostService.getPostById(req.params.id)

      res.send(getSinglePost);

    } catch (error) {
      next(error); 
    }
  })
  
  .patch('/:id', ensureAuth,  async (req, res, next) => {
    try { 
      const patchSinglePost = await PostService.patchPostById(req.params.id, req.body);

      res.send(patchSinglePost);

    } catch (error) {
      next(error); 
    }
  })
  

  .delete('/:id', ensureAuth,  async (req, res, next) => {
    try { 
      const deleteSinglePost = await PostService.deletePostById(req.params.id);

      res.send(deleteSinglePost);

    } catch (error) {
      next(error); 
    }
  });
