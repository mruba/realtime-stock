'use strict';

import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';

//'item', 'upc', 'name', 'content', 'group', 'type', 'activeSustance', 'antibiotic', 'highSpeciality',
//'status', 'category', 'brand', 'provider'

var ProductSchema = new mongoose.Schema({
  item: {
    type: String,
    es_indexed: true
  },
  upc: String,
  name: {
    type: String,
    es_indexed: true
    // es_type: 'completion',
    // es_analyzer: 'simple',
    // es_search_analyzer : 'simple',
    // es_payloads : true
  },
  content: String,
  group: String,
  type: String,
  activeSustance: String,
  antibiotic:{
    type: Boolean,
    default: false
  },
  highSpeciality:{
    type: Boolean,
    default: false
  },
  status: String,
  category: String,
  brand:{
    type: String,
    es_indexed: true
  },
  provider: {
    type: String,
    es_indexed: true
  },
  price: Number,
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

ProductSchema.plugin(mongoosastic, {bulk: {
    size: 1000, // preferred number of docs to bulk index
    delay: 100 //milliseconds to wait for enough docs to meet size constraint
  }
});

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
