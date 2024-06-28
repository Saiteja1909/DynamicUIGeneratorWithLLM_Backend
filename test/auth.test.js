const app = require('../server'); // Import your express app
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Authentication API', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user and return a token', (done) => {
      chai.request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: '123456'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('should not register a user with an existing email', (done) => {
      chai.request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: '123456'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login user and return a token', (done) => {
      chai.request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: '123456'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('should not login with wrong credentials', (done) => {
      chai.request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});
