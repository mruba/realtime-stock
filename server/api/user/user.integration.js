'use strict';

import app from '../..';
import User from './user.model';
//import Address from './address.model';
import request from 'supertest';

describe('User API:', function() {


  var user;

  // Clear users before testing
  //we should create the address before create the user
  //so we can make a better test
  before(function() {

    return User.remove().then(function() {
      user = new User({
        name: 'Fake User',
        email: 'test@example.com',
        password: 'password',
        role: 'salesman'
      });

      return user.save();
    });
  });

  // Clear users after testing
  after(function() {
    return User.remove();
  });

  describe('GET /api/users/me', function() {
    var token;

    before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'test@example.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    it('should respond with a user profile when authenticated', function(done) {
      request(app)
        .get('/api/users/me')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body._id.toString()).to.equal(user._id.toString());
          done();
        });
    });

    it('should respond with a 401 when not authenticated', function(done) {
      request(app)
        .get('/api/users/me')
        .expect(401)
        .end(done);
    });

  });

  describe('GET /api/users/search', function(){
    var searchUser;
    var token;

    before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'test@example.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });


    after(function() {
      searchUser = {};
    });

    // Please fix this test in the future
    // it('should respond with the searched user', function() {
    //   request(app)
    //     .get('/api/users/search?q=test@example.com')
    //     .set('authorization', 'Bearer ' + token)
    //     //.expect(200)
    //     .expect('Content-Type', /json/)
    //     .end((err, res) => {
    //       searchUser = res.hits[0]._source;
    //       // expect(user.name).to.equal(searchUser.name);
    //       // expect(user.email).to.equal(searchUser.email);
    //       done();
    //     });
    // });


  });


  describe('POST /api/users', function() {
    var newUser;
    beforeEach(function(done) {
      request(app)
        .post('/api/users')
        .send({
          name: 'Fake User',
          email: 'fake01@example.com',
          password: 'password',
          role: 'salesman'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newUser = res.body;
          done();
        });
    });

    // it('should respond with the newly created user', function() {
    //   expect(newUser.name).to.equal('Fake User');
    //   expect(newUser.email).to.equal('fake01@example.com');
    //
    //   expect(newUser.phone).to.equal('5555555555');
    //   expect(newUser.mobile_phone).to.equal('5555555555');
    //   expect(newUser.street_name).to.equal('Av Revolucion');
    //   expect(newUser.street_number).to.equal('444');
    //   expect(newUser.colony).to.equal('San Peter Pan');
    //   expect(newUser.state).to.equal('Mexico');
    //   expect(newUser.city).to.equal('Ciudad de Mexico');
    //   expect(newUser.delegation).to.equal('Benito Juarez');
    //   expect(newUser.zip_code).to.equal('03800');
    // });

  });


});
