import { Meteor } from 'meteor/meteor';
import { Devices } from '/imports/api/devices/devices.js';


Meteor.publish('devices', function(deviceId) {

  if (!this.userId) {
    return this.ready();
  }

  // TODO: check for parameters

  if (deviceId) {
    return Devices.find({ _id: deviceId, "users._id": this.userId }, { limit: 1 });
  } else {
    return Devices.find({ "users._id": this.userId });
  }

});
