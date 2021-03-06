/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/products              ->  index
 * POST    /api/products              ->  create
 * GET     /api/products/:id          ->  show
 * PUT     /api/products/:id          ->  update
 * DELETE  /api/products/:id          ->  destroy
 */

'use strict';

import Product from './product.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import stockProductMerge from './stock.handler'
//import redis from 'redis';
//import redisConnection from 'redis-connection';

//var client = redis.createClient();
// var redisClient = redisConnection();

/**
 * handleError and validate Errors
 */
function handleEntityNotFound(res) {
 return function(entity) {
   if (!entity) {
     res.status(404).end();
     return null;
   }
   return entity;
 };
}

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

/**
 * Get list of products
 * restriction: 'admin'
 */
export function index(req, res) {
  return Product.find({}).exec()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch(handleError(res));
}

// Search with elastich Search
export function suggest(req, res){
  return Product.search({ match_all: {}},
    {
      suggest: {
        productsuggest: {
          text: req.query.q,
          completion: {
            field: 'name'
          }
        }
      }
    }, function(err, response) {
      console.log(response.suggest)
      return res.send(response.suggest)
    });
}



// Search with elastich Search
export function search(req, res){
  let pageNum = req.query.pageNum || 1;
  let perPage = req.query.perPage || 10;
  Product.search({
    filtered: {
      query:{
        query_string: {
          // Be aware that wildcard queries can use an
          // enormous amount of memory and perform very badly
          query: `${req.query.q}`,
          default_operator: 'OR'
        }
      },
      filter:{
        term:{
          active: true
        }
      }
    }
  },
  {
    from: (pageNum - 1) * perPage,
    size: perPage,
    hydrate: true
  }, function(err, results) {
    // results here
    if(err) res.send(err);
    else{
      if(results.hits.total > 0){
        stockProductMerge(results.hits.hits, req.query.store)
        .then((products)=>{
          res.status(200).json({hits: results.hits.total, products: products});
        })
        // res.json(results)
      }else{
        res.status(404).end();
      }
    }
  });
}


/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
  res.redirect('/');
}





//
//
//
//
//
// function respondWithResult(res, statusCode) {
//   statusCode = statusCode || 200;
//   return function(entity) {
//     if (entity) {
//       res.status(statusCode).json(entity);
//     }
//   };
// }
//
// function saveUpdates(updates) {
//   return function(entity) {
//     var updated = _.merge(entity, updates);
//     return updated.save()
//       .then(updated => {
//         return updated;
//       });
//   };
// }
//
// function removeEntity(res) {
//   return function(entity) {
//     if (entity) {
//       return entity.remove()
//         .then(() => {
//           res.status(204).end();
//         });
//     }
//   };
// }
//
// function handleEntityNotFound(res) {
//   return function(entity) {
//     if (!entity) {
//       res.status(404).end();
//       return null;
//     }
//     return entity;
//   };
// }
//
// function handleError(res, statusCode) {
//   statusCode = statusCode || 500;
//   return function(err) {
//     res.status(statusCode).send(err);
//   };
// }
//
// // Gets a list of Products
// export function index(req, res) {
//   return 'hello'
//     .then(respondWithResult(res))
//     .catch(handleError(res));
// }
//
// Gets a single Product from the DB
export function show(req, res) {
  return Product.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(validationError(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
//
// Creates a new Product in the DB
export function create(req, res) {
  return Product.create(req.body)
    .then(handleEntityNotFound(res))
    .then(validationError(res))
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}
//
// // Updates an existing Product in the DB
// export function update(req, res) {
//   if (req.body._id) {
//     delete req.body._id;
//   }
//   return Product.findById(req.params.id).exec()
//     .then(handleEntityNotFound(res))
//     .then(saveUpdates(req.body))
//     .then(respondWithResult(res))
//     .catch(handleError(res));
// }
//
// // Deletes a Product from the DB
// export function destroy(req, res) {
//   return Product.findById(req.params.id).exec()
//     .then(handleEntityNotFound(res))
//     .then(removeEntity(res))
//     .catch(handleError(res));
// }
