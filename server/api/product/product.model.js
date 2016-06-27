'use strict';

import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';

var ProductSchema = new mongoose.Schema({
  item: String,
  upc: String,
  name: {
    type: String,
    es_indexed: true
    // es_type: 'completion',
    // es_analyzer: 'simple',
    // es_search_analyzer : 'simple',
    // es_payloads : true
  },
  description: {
    type:String,
    es_indexed: true
  },
  provider: {
    type: String,
    es_indexed: true
  },
  price: Number,
  status: String,
  family: String,
  images:   {
    thumb: String,
    medium: String,
    large: String
  },
  active: {es_indexed: true, es_type: Boolean, es_default: true, type: Boolean, default: true}
});

ProductSchema.statics.random = function(callback) {
  this.count(function(err, count) {
    if (err) {
      return callback(err);
    }
    var rand = Math.floor(Math.random() * count);
    this.findOne().skip(rand).exec(callback);
  }.bind(this));
};

ProductSchema.plugin(mongoosastic);

ProductSchema = mongoose.model('Product', ProductSchema);

// ProductSchema.createMapping(function(err, mapping){
//   if(err){
//     console.log('error creating mapping (you can safely ignore this)');
//     console.log(err);
//   }else{
//     // console.log('mapping created!');
//     // console.log(mapping);
//   }
// });




export default  ProductSchema;
