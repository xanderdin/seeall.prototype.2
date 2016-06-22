import { Meteor } from 'meteor/meteor';
import { History } from '/imports/api/history/history.js';


Meteor.methods({

  // writeHistory: function(userId, devId, info) {
  //
  //   // if (!this.userId) {
  //   //   throw new Meteor.Error('not-logged-in', 'Must be logged in before writting to history.');
  //   // }
  //
  //   return History.insert({
  //     createdAt: new Date(),
  //     deviceId: devId,
  //     userId: userId,
  //     info: info
  //   });
  // },

  writeHistory: function(data) {

    if (Meteor.isClient && !this.userId) {
      throw new Meteor.Error('not-logged-in', 'Must be logged in before writting to history.');
    }

    var record = {
      createdAt: new Date()
    };

    if (this.userId) {
      record.userId = this.userId;
    }

    var key;

    for (key in data) {

      // don't overwrite fields set inside this function
      if (key === 'createdAt' || key === 'userId') {
        continue;
      }

      record[key] = data[key];
    }

    return History.insert(record);
  }

});
