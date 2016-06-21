'use strict';

import mongoose from 'mongoose';
import ProductModel from '../product/product.model'

//var ProductSchema = ProductModel.schema;

var Schema = mongoose.Schema;

var OrderSchema = new Schema({
  status: {type: String, default: 'pending'},
  pharmacy: String,
  payment: String,
  comment: String,
  info: String,
  active: Boolean,
  products: [
    {
      id: {type: Schema.Types.ObjectId,  ref: 'Product'},
      amount:   { type: Number, require: true }
    },
  ],
  _agent: {type: Schema.Types.ObjectId, ref: 'User', require:true},
  _user: {type: Schema.Types.ObjectId, ref: 'User', require:true}
  },
  { timestamps: { createdAt: 'created_at' } }
);

export default mongoose.model('Order', OrderSchema);
