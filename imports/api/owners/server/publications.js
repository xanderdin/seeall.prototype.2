import { Owners } from '/imports/api/owners/owners.js';


Meteor.publish('owners', function(deviceId){

  if (!this.userId) {
    return this.ready();
  }

  var ownersFields = {
    _id: 1,
    deviceId: 1,
    num: 1,
    userId: 1
  };

  return Owners.find(
    { deviceId: deviceId },
    { fields: ownersFields }
  );
});
