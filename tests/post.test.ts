import { expect } from 'chai';
import supertest from 'supertest';
import { app } from '../src/server';
import RESPONSE_CODES from '../src/constants/responseCodes';
import { generateAuthToken } from '../src/helpers/authHelper';

describe('Add & fetch posts', () => {
  const user = {
    email: 'johndoe@example.com',
    password: 'abcd1234',
  };
  const post = {
    title: 'My first post',
    content: 'This is my first post',
  };

  let authToken: string;

  before(async () => {
    authToken = await generateAuthToken(user.email, user.password);
  });

  it('should be able to add a new post', (done) => {
    supertest(app)
      .post('/posts')
      .set('authtoken', authToken)
      .send(post)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);
        expect(res.body.response_code).to.equal(RESPONSE_CODES.ok);
        done();
      });
  });

  it('should not be able to add a new post if auth token is missing', (done) => {
    supertest(app)
      .post('/posts')
      .send(post)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);
        expect(res.body.response_code).to.equal(RESPONSE_CODES.authorizationError);
        done();
      });
  });

  it('should be able to fetch all the posts', (done) => {
    supertest(app)
      .get('/posts')
      .set('authtoken', authToken)
      .send(post)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);
        expect(res.body.response_code).to.equal(RESPONSE_CODES.ok);
        expect(res.body.payload).to.have.lengthOf.above(0);
        done();
      });
  });

  it('should not be able to fetch posts if auth token is missing', (done) => {
    supertest(app)
      .get('/posts')
      .send(post)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);
        expect(res.body.response_code).to.equal(RESPONSE_CODES.authorizationError);
        done();
      });
  });

  it('should be able to search a post', (done) => {
    supertest(app)
      .get(`/posts?title=${post.title}`)
      .set('authtoken', authToken)
      .send(post)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);
        expect(res.body.response_code).to.equal(RESPONSE_CODES.ok);
        expect(res.body.payload).to.have.lengthOf.above(0);
        done();
      });
  });
});
