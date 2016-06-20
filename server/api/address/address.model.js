'use strict';

import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var AddressSchema = new Schema({
  addressName: String,
  streetName: String,
  streetNumber: String,
  colony: String,
  delegation: String,
  state: String,
  city: String,
  zip: String,
  phone: String,
  phoneExt: String,
  mobile: String,
  info: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});

export default mongoose.model('Address', AddressSchema);
