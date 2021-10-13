const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const { session } = req.cookies;
    const user = jwt.verify(session, process.env.APP_SECRET);
    req.user = user;
   
    next();
  } catch (error) {
    error.status = 401;
    error.message = '(☞ ͡° ͜ʖ ͡°)☞ You must be signed in to continue';
    next (error);  
  }
};
