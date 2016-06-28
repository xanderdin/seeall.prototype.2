import { Meteor } from 'meteor/meteor';
import { History } from '/imports/api/history/history.js';


Meteor.methods({

  writeHistory: function(data) {

    if (Meteor.isClient && !this.userId) {
      throw new Meteor.Error(
        'not-logged-in',
        'Must be logged in before writting to history.');
    }

    var record = {
      createdAt: new Date()
    };

    if (this.userId) {
      record.userId = this.userId;
      var user = Meteor.user();
      if (user && user.username) {
        record.username = user.username;
      }
    }

    var key;

    for (key in data) {

      // don't overwrite fields set inside this function
      if (key === 'createdAt' || key === 'userId' || key === 'username') {
        continue;
      }

      record[key] = data[key];
    }

    return History.insert(record);
  }

});
