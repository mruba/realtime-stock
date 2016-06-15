'use strict';

import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';

var ProductSchema = new mongoose.Schema({
  item: String,
  upc: String,
  name: {
    type: String,
    es_indexed:true
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

var MongooseSearch = mongoose.model('Product', ProductSchema);

export {MongooseSearch};

// ProductSchema.createMapping(function(err, mapping){
//   if(err){
//     console.log('error creating mapping (you can safely ignore this)');
//     console.log(err);
//   }else{
//     console.log('mapping created!');
//     console.log(mapping);
//   }
// });



//
// export default  ProductSchema;
