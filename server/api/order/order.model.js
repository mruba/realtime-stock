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
  //products: [ProductSchema],
  _agent: {type: Schema.Types.ObjectId, ref: 'User'},
  _user: {type: Schema.Types.ObjectId, ref: 'User'}
  },
  { timestamps: { createdAt: 'created_at' } }
);

export default mongoose.model('Order', OrderSchema);
