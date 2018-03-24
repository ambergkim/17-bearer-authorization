'use strict';

const superagent = require('superagent');

const SERVER_URL = 'http://localhost:3000';

describe('Overall tests', () => {

  test('throws 404 if route is not found', (done) => {
    superagent.get(SERVER_URL + '/api/wrongurl')
      .end((err, res) => {
        expect(res.status).toBe(404);
        done();
      });
  });

});

describe('Signup tests', () => {

  test('sends 200 with valid body', (done) => {
    let newUser = {
      username: 'John Doe',
      email: 'email@email.com',
      password: '1234',
    };
    superagent.post(SERVER_URL + '/api/signup')
      .set('Content-Type', 'application/json')
      .auth(newUser.username, newUser.password)
      .send(JSON.stringify(newUser))
      .end((err, res) => {
        if (err) {
          console.error(err);
        }
        expect(res.status).toBe(200);
        done();
      });
  });

  test('sends 400 with no body', (done) => {
    superagent.post(SERVER_URL + '/api/signup')
      .end((err, res) => {
        expect(res.status).toBe(400);
        done();
      });
  });

  test('sends 400 with invalid body', (done) => {
    let newUser = {
      username: 'John Doe',
      email: 'email@email.com',
    };
    superagent.post(SERVER_URL + '/api/signup')
      .set('Content-Type', 'application/json')
      .auth(newUser.username, newUser.password)
      .send(JSON.stringify(newUser))
      .end((err, res) => {
        expect(res.status).toBe(400);
        done();
      });
  });

});

describe('Signin tests', () => {

  test('sends 200 with valid authorization header', (done) => {
    let newUser = {
      username: 'John Doe',
      email: 'email@email.com',
      password: '1234',
    };
    superagent.post(SERVER_URL + '/api/signup')
      .set('Content-Type', 'application/json')
      .auth(newUser.username, newUser.password)
      .send(JSON.stringify(newUser))
      .end((err, res) => {
        superagent.get(SERVER_URL + '/api/signin')
          .set('Content-Type', 'application/json')
          .auth('John Doe', '1234')
          .end((err, res) => {
            if (err) {
              console.error(err);
            }
            expect(res.status).toBe(200);
            done();
          });
      });
  });

  test('sends 401 with user that cannot be authenticated', (done) => {
    let newUser = {
      username: 'John Doe',
      email: 'email@email.com',
      password: '1234',
    };
    superagent.post(SERVER_URL + '/api/signup')
      .set('Content-Type', 'application/json')
      .auth(newUser.username, newUser.password)
      .send(JSON.stringify(newUser))
      .end((err, res) => {
        superagent.get(SERVER_URL + '/api/signin')
          .set('Content-Type', 'application/json')
          .auth('John Doe', '12345')
          .end((err, res) => {
            expect(res.status).toBe(401);
            done();
          });
      });
  });

});