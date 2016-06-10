import { Meteor } from 'meteor/meteor';
import { History } from '/imports/api/history/history.js';


Meteor.methods({

  writeHistory: function(userId, devId, info) {

    // if (!this.userId) {
    //   throw new Meteor.Error('not-logged-in', 'Must be logged in before writting to history.');
    // }

    return History.insert({
      createdAt: new Date(),
      deviceId: devId,
      userId: userId,
      info: info
    });
  },

});
