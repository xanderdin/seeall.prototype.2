import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Owners } from '/imports/api/owners/owners.js';
import { History } from '/imports/api/history/history.js';


export const writeHistory = new ValidatedMethod({

  name: 'history.write',

  validate: new SimpleSchema({
    // createdAt,
    // userId,
    // username,
    event: { type: String },
    deviceId: { type: String, optional: true },
    zonesNum: { type: [Number], optional: true },
    ownerNum: { type: Number, optional: true },
    textData: { type: String, optional: true },
  }).validator(),

  run(data) {

    if (Meteor.isClient && !this.userId) {
      throw new Meteor.Error(
        'not-logged-in',
        'Must be logged in before writting to history.');
    }

    const record = {
      createdAt: new Date()
    };

    if (this.userId) { // get username and ownerNum by userId
      record.userId = this.userId;
      const user = Meteor.user();
      if (user && user.username) {
        record.username = user.username;
      }
      if (!data.ownerNum && data.deviceId) {
        const owner = Owners.findOne(
          { deviceId: data.deviceId,  userId: this.userId },
          { fields: { num: 1}}
        );
        if (owner && owner.num ) {
          record.ownerNum = owner.num;
        }
      }
    } else { // get username and userId by ownerNum
      if (data.ownerNum && data.deviceId) {
        const owner = Owners.findOne(
          { deviceId: data.deviceId, num: data.ownerNum },
          { fields: { userId: 1 }}
        );
        if (owner && owner.userId) {
          const user = Meteor.users.findOne(
            { _id: owner.userId },
            { fields: { _id: 1, username: 1 }}
          );
          if (user) {
            record.userId = user._id;
            if (user.username) {
              record.username = user.username;
            }
          }
        }
      }
    }

    var key;

    for (key in data) {

      // Don't overwrite fields set inside this function
      if (key === 'createdAt' || key === 'userId' || key === 'username') {
        continue;
      }

      record[key] = data[key];
    }

    return History.insert(record);
  }
});
