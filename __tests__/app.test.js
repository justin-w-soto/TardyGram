const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const User = require('../lib/models/User');



//---------------------------------------------//
jest.mock('../lib/middleware/ensureAuth.js', () => {
  return (req, res, next) => {
    req.user = {
      username: 'test_user',
      photoUrl: 'https://example.com/image.png',
      iat: Date.now(),
      exp: Date.now(),
    };

    next();
  };
});


describe('TardyGram routes', () => {
  //---------------------------------------------//
  beforeEach(() => {
    return setup(pool);
  });
  //---------------------------------------------//

  it('should say yes', () => {
    expect('yes').toEqual('yes');
  });


  //---------------------------------------------//
  it('POST /posts responds with the new post', async () => {
    await User.insert({
      username: 'test_user',
      avatarUrl: 'https://example.com/image.png'
    });
    
    const res = await request(app).post('/api/auth/posts').send({ photo:'Some Url string', caption:'Cristina was here', tags:['tagA', 'tagB'] });
    expect(res.body).toEqual(
      { 
        id:expect.any(String),
        user:expect.any(String),
        photo:'Some Url string', 
        caption: 'Cristina was here',
        tags:['tagA', 'tagB'] 

      });
  });


  //---------------------------------------------//

  it('GET / All post ', async () => {
    await User.insert({
      username: 'test_user',
      avatarUrl: 'https://example.com/image.png'
    });
    
    await request(app).post('/api/auth/posts').send({ photo:'Some Url string', caption:'Later Alligator', tags:['tagA', 'tagB'] });

    await request(app).post('/api/auth/posts').send({ photo:'emojis.png', caption:'🤬👹👽🤢', tags:['tagA', 'tagB'] });

    const res = await request(app).get('/api/auth/posts');

    expect(res.body).toEqual([{ 
      id:expect.any(String),
      user:'test_user',
      photo:'Some Url string', 
      caption: 'Later Alligator',
      tags:['tagA', 'tagB'] 

    },
    { 
      id:expect.any(String),
      user:'test_user',
      photo:'emojis.png', 
      caption: '🤬👹👽🤢',
      tags:['tagA', 'tagB'] 

    }
    
    ]);
    
  });

  //---------------------------------------------//

  it('GET / post by id ', async () => {
    await User.insert({
      username: 'test_user',
      avatarUrl: 'https://example.com/image.png'
    });
    
    await request(app).post('/api/auth/posts').send({ photo:'Some Url string', caption:'Later Alligator', tags:['tagA', 'tagB'] });

    await request(app).post('/api/auth/posts').send({ photo:'emojis.png', caption:'🤬👹👽🤢', tags:['tagA', 'tagB'] });


    const res = await request(app).post('/api/auth/comments')
      .send({
        id: 2,
        comment: 'BLAH BLAH I DONT LIKE YOU'
      });

    expect(res.body).toEqual(
      { 
        id:expect.any(String),
        comment_by:'test_user',
        post: expect.any(String), 
        comment: 'BLAH BLAH I DONT LIKE YOU'
      }
    );
    
  });

  //---------------------------------------------//









  afterAll(() => {
    pool.end();
  });

  //---------------------------------------------//

  it('returns a user object from GET /api/v1/auth/me when logged in', async () => {
    const res = await request(app).get('/api/auth/verify');

    expect(res.body).toEqual({
      username: 'test_user',
      photoUrl: 'https://example.com/image.png',
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });


  //---------------------------------------------//
});
