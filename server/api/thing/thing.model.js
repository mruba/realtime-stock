'use strict';

import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';

var Schema = mongoose.Schema;

var ThingSchema = new Schema({
  name: {
    type: String,
    es_type: 'completion',
    es_analyzer: 'simple',
    es_indexed: true,
    es_search_analyzer : 'simple',
    es_payloads : true
  },
  info: {type: String},
  active: {type: Boolean, default: true}
});

ThingSchema.plugin(mongoosastic);

ThingSchema = mongoose.model('Thing', ThingSchema);

ThingSchema.createMapping(function(err, mapping){
  if(err){
    console.log('error creating mapping (you can safely ignore this)');
    console.log(err);
  }else{
    console.log('mapping created!');
    console.log(mapping);
  }
});





// var stream = ThingSchema.synchronize(), count = 0;
//
// stream.on('data', function(err, doc) {
//     count++;
// });
// stream.on('close', function() {
//     console.log('indexed ' + count + ' documents!');
// });
// stream.on('error', function(err) {
//     console.log(err);
// });


export default ThingSchema;
