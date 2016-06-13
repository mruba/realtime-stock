/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/products              ->  index
 * POST    /api/products              ->  create
 * GET     /api/products/:id          ->  show
 * PUT     /api/products/:id          ->  update
 * DELETE  /api/products/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Product from './product.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

/**
 * handleError and validate Errors
 */
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
export function search(req, res){
  return Product.search({ match_all: {}},
    {
          suggest: {
            thingsuggest: {
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
// // Gets a single Product from the DB
// export function show(req, res) {
//   return Product.findById(req.params.id).exec()
//     .then(handleEntityNotFound(res))
//     .then(respondWithResult(res))
//     .catch(handleError(res));
// }
//
// // Creates a new Product in the DB
// export function create(req, res) {
//   return Product.create(req.body)
//     .then(respondWithResult(res, 201))
//     .catch(handleError(res));
// }
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
