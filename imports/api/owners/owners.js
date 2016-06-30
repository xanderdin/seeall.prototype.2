import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import './functions.js';


export const Owners = new Mongo.Collection('owners');


Owners.attachSchema(new SimpleSchema({
  deviceId: {
    type: String,
    regEx: /^[0-9a-f]{12}$/
  },
  num: {
    type: Number,
    min: 1,
    max: 32
  },
  userId: {
    type: String
  }
}));


Owners.helpers({

  formatNum() {
    return formatOwnerNum(this.num);
  },

  name() {
    const user =  Meteor.users.findOne(
      { _id: this.userId },
      { fields: { username: 1 }}
    );
    return user ? user.username ? user.username : '' : '';
  }
});
