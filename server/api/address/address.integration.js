'use strict';

var app = require('../..');
import request from 'supertest';

var newAddress;

describe('Address API:', function() {

  describe('GET /api/addresses', function() {
    var addresss;

    beforeEach(function(done) {
      request(app)
        .get('/api/addresses')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          addresss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(addresss).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/addresses', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/addresses')
        .send({
          addressName: 'Casa',
          streetName: 'av revolucion',
          streetNumber: '444',
          colony: 'San Pedro de los pinos',
          delegation: 'Benito Juarez',
          state: 'Mexico',
          city: 'Mexico',
          zip: '03800',
          phone: '5528559570',
          mobile: '5528559579',
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newAddress = res.body;
          done();
        });
    });

    it('should respond with the newly created address', function() {
      expect(newAddress.addressName).to.equal('Casa');
      expect(newAddress.streetName).to.equal('av revolucion');
      expect(newAddress.streetNumber).to.equal('444');
      expect(newAddress.colony).to.equal('San Pedro de los pinos');
      expect(newAddress.delegation).to.equal('Benito Juarez');
      expect(newAddress.state).to.equal('Mexico');
      expect(newAddress.city).to.equal('Mexico');
      expect(newAddress.zip).to.equal('03800');
    });

  });

  describe('GET /api/addresses/:id', function() {
    var address;

    beforeEach(function(done) {
      request(app)
        .get('/api/addresses/' + newAddress._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          address = res.body;
          done();
        });
    });

    afterEach(function() {
      address = {};
    });

    it('should respond with the requested address', function() {
      expect(newAddress.addressName).to.equal('Casa');
      expect(newAddress.streetName).to.equal('av revolucion');
      expect(newAddress.streetNumber).to.equal('444');
      expect(newAddress.colony).to.equal('San Pedro de los pinos');
      expect(newAddress.delegation).to.equal('Benito Juarez');
      expect(newAddress.state).to.equal('Mexico');
      expect(newAddress.city).to.equal('Mexico');
      expect(newAddress.zip).to.equal('03800');
    });

  });

  describe('PUT /api/addresses/:id', function() {
    var updatedAddress;

    beforeEach(function(done) {
      request(app)
        .put('/api/addresses/' + newAddress._id)
        .send({
          addressName: 'Trabajo',
          streetName: 'tabachines',
          streetNumber: '222',
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedAddress = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAddress = {};
    });

    it('should respond with the updated address', function() {
      expect(updatedAddress.addressName).to.equal('Trabajo');
      expect(updatedAddress.streetName).to.equal('tabachines');
      expect(updatedAddress.streetNumber).to.equal('222');
    });

  });

  describe('DELETE /api/addresses/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/addresses/' + newAddress._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when address does not exist', function(done) {
      request(app)
        .delete('/api/addresses/' + newAddress._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
