import { Owners } from '/imports/api/owners/owners.js';
import { Zones } from '/imports/api/zones/zones.js';


Meteor.publishComposite('zones', function(deviceId) {

  const zonesFields = {
    _id: 1,
    deviceId: 1,
    num: 1,
    name: 1,
    isArmed: 1,
    isFired: 1,
    isTamperOpen: 1,
    isBatteryLow: 1,
    isPowerLost: 1,
    isLinkLost: 1,
    isFailure: 1,
    type: 1
  };

  return {
    find: function() {
      // Make sure the current user is the owner of specified device
      return Owners.find(
        { deviceId: deviceId, userId: this.userId },
        { fields: { deviceId: 1 } }
      );
    },
    children: [
      {
        find: function(owner) {
          // Find zones of the specified device
          return Zones.find(
            { deviceId: owner.deviceId },
            { fields: zonesFields }
          );
        }
      }
    ]
  };
});
