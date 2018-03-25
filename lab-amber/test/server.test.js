'use strict';

const superagent = require('superagent');

const SERVER_URL = 'http://localhost:3000';

describe('No token requests for post resource tests', () => {

  test('sends 401 for GET requests if no token was provided', (done) => {
    superagent.get(SERVER_URL + '/api/posts')
      .end((err, res) => {
        expect(res.status).toBe(401);
        done();
      });;
  });

  test('sends 401 for POST requests if no token was provided', (done) => {
    let newUser = {
      username: 'John',
      email: 'Doe',
      password: '1234'
    };
    superagent.post(SERVER_URL + '/api/posts')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(newUser))
      .end((err, res) => {
        expect(res.status).toBe(401);
        done();
      });;
  });

  test('sends 401 for PUT requests if no token was provided', (done) => {
    let newUser = {
      username: 'John',
      email: 'Doe',
      password: '1234'
    };
    let postId;
    superagent.post(SERVER_URL + '/api/posts')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(newUser))
      .end((err, res) => {
        postId = res.body._id;
        let updatedPost = {
          content: 'Old post with brand new content!'
        };
        superagent.put(SERVER_URL + '/api/posts?id=' + postId)
          .set('Content-Type', 'application/json')
          .send(JSON.stringify(updatedPost))
          .end((err, res) => {
            expect(res.status).toBe(401);
            done();
          });
      });;
  });

});

describe('Valid User and post resource tests', () => {

  test('sends 200 for a post request with a valid body', (done) => {
    let newUser = {
      username: 'John',
      email: 'Doe',
      password: '1234'
    };
    let userId;
    let token;
    superagent.post(SERVER_URL + '/api/signup')
      .set('Content-Type', 'application/json')
      .auth(newUser.username, newUser.password)
      .send(JSON.stringify(newUser))
      .end((err, res) => {
        userId = res.body._id;
        superagent.get(SERVER_URL + '/api/signin')
          .set('Content-Type', 'application/json')
          .auth(newUser.username, newUser.password)
          .end((err, res) => {
            let newPost = {
              userId: userId,
              content: 'I am a new post!'
            };
            token = res.body.token;
            superagent.post(SERVER_URL + '/api/posts')
              .set('Content-Type', 'application/json')
              .set('Authorization', 'Bearer ' + token)
              .send(newPost)
              .end((err, res) => {
                expect(res.status).toBe(200);
                done();
              });
          });
      });
  });

  test('sends 200 for a GET request made with a valid id', (done) => {
    let newUser = {
      username: 'John1',
      email: 'Doe1',
      password: '1234'
    };
    let userId;
    let token;
    let postId;
    superagent.post(SERVER_URL + '/api/signup')
      .set('Content-Type', 'application/json')
      .auth(newUser.username, newUser.password)
      .send(JSON.stringify(newUser))
      .end((err, res) => {
        userId = res.body._id;
        superagent.get(SERVER_URL + '/api/signin')
          .set('Content-Type', 'application/json')
          .auth(newUser.username, newUser.password)
          .end((err, res) => {
            let newPost = {
              userId: userId,
              content: 'I am a new post!'
            };
            token = res.body.token;
            superagent.post(SERVER_URL + '/api/posts')
              .set('Content-Type', 'application/json')
              .set('Authorization', 'Bearer ' + token)
              .send(newPost)
              .end((err, res) => {
                postId = res.body._id;
                superagent.get(SERVER_URL + '/api/posts?id=' + postId)
                  .set('Authorization', 'Bearer ' + token)
                  .end((err, res) => {
                    expect(res.status).toBe(200);
                    done();
                  });
              });
          });
      });
  });

  test('sends 200 for a PUT request made with a valid id', (done) => {
    let newUser = {
      username: 'John2',
      email: 'Doe2',
      password: '1234'
    };
    let userId;
    let token;
    let postId;
    superagent.post(SERVER_URL + '/api/signup')
      .set('Content-Type', 'application/json')
      .auth(newUser.username, newUser.password)
      .send(JSON.stringify(newUser))
      .end((err, res) => {
        userId = res.body._id;
        superagent.get(SERVER_URL + '/api/signin')
          .set('Content-Type', 'application/json')
          .auth(newUser.username, newUser.password)
          .end((err, res) => {
            let newPost = {
              userId: userId,
              content: 'I am a new post!'
            };
            token = res.body.token;
            superagent.post(SERVER_URL + '/api/posts')
              .set('Content-Type', 'application/json')
              .set('Authorization', 'Bearer ' + token)
              .send(JSON.stringify(newPost))
              .end((err, res) => {
                postId = res.body._id;
                let updatedPost = {
                  content: 'Old post with brand new content!'
                };
                superagent.put(SERVER_URL + '/api/posts?id=' + postId)
                  .set('Content-Type', 'application/json')
                  .set('Authorization', 'Bearer ' + token)
                  .send(JSON.stringify(updatedPost))
                  .end((err, res) => {
                    expect(res.status).toBe(200);
                    done();
                  });
              });
          });
      });
  });
});