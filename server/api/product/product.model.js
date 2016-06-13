'use strict';

import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';

var ProductSchema = new mongoose.Schema({
  item: String,
  upc: String,
  name: {
    type: String,
    es_type: 'completion',
    es_analyzer: 'simple',
    es_indexed: true,
    es_search_analyzer : 'simple',
    es_payloads : true
  },
  description: String,
  provider: String,
  price: Number,
  status: String,
  family: String,
  images:   {
    thumb: String,
    medium: String,
    large: String
  },
  active: {type: Boolean, default: true}
});



ProductSchema.plugin(mongoosastic);

ProductSchema = mongoose.model('Product', ProductSchema);

ProductSchema.createMapping(function(err, mapping){
  if(err){
    console.log('error creating mapping (you can safely ignore this)');
    console.log(err);
  }else{
    console.log('mapping created!');
    console.log(mapping);
  }
});



export default  ProductSchema;
