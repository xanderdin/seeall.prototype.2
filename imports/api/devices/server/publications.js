import { Devices } from '/imports/api/devices/devices.js';
import { Owners } from '/imports/api/owners/owners.js';


Meteor.publishComposite('devices', function(deviceId) {

  const devicesFields = {
    _id: 1,
    name: 1,
    isOnline: 1,
    isTamperOpen: 1,
    isBatteryLow: 1,
    isPowerLost: 1,
    isFailure: 1,
    isOff: 1,
    simBalance: 1,
  };

  return {
    find: function() {
      var qry = {
        userId: this.userId
      };
      if (deviceId) {
        qry.deviceId = deviceId;
      }
      return Owners.find(
        qry,
        { fields: { deviceId: 1 } }
      );
    },
    children: [
      {
        find: function(owner) {
          return Devices.find(
            { _id: owner.deviceId },
            { fields: devicesFields }
          );
        }
      }
    ]
  };

});
