'use strict';

import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';

var location = new mongoose.Schema({
  zip: {
    type: String,
    es_indexed: true
  },
  delegation: {
    type: String,
    es_indexed: true
  },
  colonie: {
    type: String,
    es_indexed: true
  },
  state: String,
  city: String,
  citycode: String,
  transportzone: {
    type: String,
    es_indexed: true
  },
  citypcode: String
});

location.plugin(mongoosastic, {bulk: {
    size: 1000, // preferred number of docs to bulk index
    delay: 100 //milliseconds to wait for enough docs to meet size constraint
  }
});

var locationSchema = mongoose.model('Location', location);

export default locationSchema
