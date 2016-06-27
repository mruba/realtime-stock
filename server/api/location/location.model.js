'use strict';

import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';

var location = new mongoose.Schema({
  zip: String,
  delegation: String,
  colonie: String,
  state: String,
  transportzone: String,
  pharmacyName: String,
  pharmacyNumber: Number
});

// location.plugin(mongoosastic, {bulk: {
//     size: 1000, // preferred number of docs to bulk index
//     delay: 100 //milliseconds to wait for enough docs to meet size constraint
//   }
// });

var locationSchema = mongoose.model('Location', location);

export default locationSchema
