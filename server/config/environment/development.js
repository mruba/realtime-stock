'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/bcpsp-dev'
  },
  // Seed database on startup
  seedDB: false,
  bulkDB: false
};
