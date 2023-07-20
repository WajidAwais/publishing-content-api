import { expect } from 'chai';
import supertest from 'supertest';
import { app } from '../src/server';
import RESPONSE_CODES from '../src/constants/responseCodes';

describe('user authentication', () => {
  const randomNum = Math.random();
  const email = `johndoe${randomNum}@example.com`;

  const user = {
    name: 'John Doe',
    email,
    password: 'abcd1234',
  };

  it('should create a new user when valid data is provided', (done) => {
    supertest(app)
      .post('/users/signup')
      .send(user)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);
        expect(res.body.response_code).to.equal(RESPONSE_CODES.ok);
        done();
      });
  });

  it('should return an error if the user already exists', (done) => {
    supertest(app)
      .post('/users/signup')
      .send(user)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);
        expect(res.body.response_code).to.equal(RESPONSE_CODES.serverError);
        expect(res.body.message).to.equal('User already exists');
        done();
      });
  });

  it('should login & receive auth token when correct crediantials are provided', (done) => {
    supertest(app)
      .post('/users/login')
      .send(user)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);
        expect(res.body.response_code).to.equal(RESPONSE_CODES.ok);
        expect(res.body.payload.authtoken).to.be.a('string');
        done();
      });
  });

  it('should provide error in case of invalid user', (done) => {
    supertest(app)
      .post('/users/login')
      .send({ ...user, email: 'abc@xyz.com' })
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);
        expect(res.body.response_code).to.equal(RESPONSE_CODES.serverError);
        expect(res.body.message).to.equal('Invalid email/password');
        done();
      });
  });

  it('should provide error in case of wrong password', (done) => {
    supertest(app)
      .post('/users/login')
      .send({ ...user, password: 'abcd12345' })
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);
        expect(res.body.response_code).to.equal(RESPONSE_CODES.serverError);
        expect(res.body.message).to.equal('Invalid email/password');
        done();
      });
  });
});
