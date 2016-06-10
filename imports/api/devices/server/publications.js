import { Meteor } from 'meteor/meteor';
import { Devices } from '/imports/api/devices/devices.js';


Meteor.publish('devices', (deviceId) => {
  if (deviceId) {
    return Devices.find({ _id: deviceId }, { limit: 1 });
    // return Devices.find({ _id: deviceId, "users._id": this.userId }, { limit: 1 });
  } else {
    return Devices.find({});
    // return Devices.find({ "users._id": this.userId });
  }
});
