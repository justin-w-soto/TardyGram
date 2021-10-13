const User = require('../models/User');
const { codeExchangeToken, getUserProfile } = require('../utils/githubApi');

module.exports = class UserService {
  static async creator(code){
    const accessToken = await codeExchangeToken(code);

    
    const profile = await getUserProfile(accessToken);

    let user = await User.findByUserName(profile.login);
    
    if(!user){
      user = await User.insert({
        username: profile.login,
        avatarUrl: profile.avatar_url
      });
    }

    return user;
  }
};
