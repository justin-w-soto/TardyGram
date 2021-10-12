const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

describe('TardyGram routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should say yes',() => {
    expect('yes').toEqual('yes');
  })
  afterAll(() => {
    pool.end();
  });
});
