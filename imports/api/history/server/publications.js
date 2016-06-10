import { Meteor } from 'meteor/meteor';
import { History } from '/imports/api/history/history.js';


Meteor.publish('history', (deviceId) => {
  if (deviceId) {
    // return History.find({ deviceId: deviceId }, { sort: [['dateTime', 'desc']]});
    return History.find({ deviceId: deviceId });
  } else {
    return History.find({});
  }
});
