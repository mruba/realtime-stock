'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var locationCtrlStub = {
  index: 'locationCtrl.index',
  show: 'locationCtrl.show',
  create: 'locationCtrl.create',
  update: 'locationCtrl.update',
  destroy: 'locationCtrl.destroy',
  findbyzip: 'locationCtrl.findbyzip'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var locationIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './location.controller': locationCtrlStub
});

describe('Location API Router:', function() {

  it('should return an express router instance', function() {
    expect(locationIndex).to.equal(routerStub);
  });

  describe('GET /api/locations/findbyzip/:id', function() {

    it('should route to location.controller.findbyzip', function() {
      expect(routerStub.get
        .withArgs('/findbyzip/:id', 'locationCtrl.findbyzip')
        ).to.have.been.calledOnce;
    });

  });
  //
  // describe('GET /y/:id', function() {
  //
  //   it('should route to location.controller.show', function() {
  //     expect(routerStub.get
  //       .withArgs('/:id', 'locationCtrl.show')
  //       ).to.have.been.calledOnce;
  //   });
  //
  // });
  //
  // describe('POST /y', function() {
  //
  //   it('should route to location.controller.create', function() {
  //     expect(routerStub.post
  //       .withArgs('/', 'locationCtrl.create')
  //       ).to.have.been.calledOnce;
  //   });
  //
  // });
  //
  // describe('PUT /y/:id', function() {
  //
  //   it('should route to location.controller.update', function() {
  //     expect(routerStub.put
  //       .withArgs('/:id', 'locationCtrl.update')
  //       ).to.have.been.calledOnce;
  //   });
  //
  // });
  //
  // describe('PATCH /y/:id', function() {
  //
  //   it('should route to location.controller.update', function() {
  //     expect(routerStub.patch
  //       .withArgs('/:id', 'locationCtrl.update')
  //       ).to.have.been.calledOnce;
  //   });
  //
  // });
  //
  // describe('DELETE /y/:id', function() {
  //
  //   it('should route to location.controller.destroy', function() {
  //     expect(routerStub.delete
  //       .withArgs('/:id', 'locationCtrl.destroy')
  //       ).to.have.been.calledOnce;
  //   });
  //
  // });

});
