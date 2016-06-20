'use strict';

var app = require('../..');
import request from 'supertest';

var newOrder;

describe('Order API:', function() {

  describe('GET /api/orders', function() {
    var orders;

    beforeEach(function(done) {
      request(app)
        .get('/api/orders')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          orders = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(orders).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/orders', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/orders')
        .send({
          status: 'pending',
          pharmacy: '001',
          payment: 'debit',
          comment: 'hola mundo',
          info: 'client mad',
          active: true,
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newOrder = res.body;
          done();
        });
    });

    it('should respond with the newly created order', function() {
      expect(newOrder.status).to.equal('pending');
      expect(newOrder.pharmacy).to.equal('001');
      expect(newOrder.payment).to.equal('debit');
      expect(newOrder.comment).to.equal('hola mundo');
      expect(newOrder.info).to.equal('client mad');
    });

  });

  describe('GET /api/orders/:id', function() {
    var order;

    beforeEach(function(done) {
      request(app)
        .get('/api/orders/' + newOrder._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          order = res.body;
          done();
        });
    });

    afterEach(function() {
      order = {};
    });

    it('should respond with the requested order', function() {
      expect(order.status).to.equal('pending');
      expect(order.pharmacy).to.equal('001');
      expect(order.payment).to.equal('debit');
      expect(order.comment).to.equal('hola mundo');
      expect(order.info).to.equal('client mad');
    });

  });

  describe('PUT /api/orders/:id', function() {
    var updatedOrder;

    beforeEach(function(done) {
      request(app)
        .put('/api/orders/' + newOrder._id)
        .send({
          status: 'route',
          pharmacy: '001',
          payment: 'credit',
          comment: 'hola mundo',
          info: 'client mad'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedOrder = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedOrder = {};
    });

    it('should respond with the updated order', function() {
      expect(updatedOrder.status).to.equal('route');
      expect(updatedOrder.pharmacy).to.equal('001');
      expect(updatedOrder.payment).to.equal('credit');
      expect(updatedOrder.comment).to.equal('hola mundo');
      expect(updatedOrder.info).to.equal('client mad');
    });

  });

  describe('DELETE /api/orders/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/orders/' + newOrder._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when order does not exist', function(done) {
      request(app)
        .delete('/api/orders/' + newOrder._id)
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
