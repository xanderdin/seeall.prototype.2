import { History } from '/imports/api/history/history.js';
import { Owners } from '/imports/api/owners/owners.js';


Meteor.publishComposite('history', function(deviceId) {

  const historyFields = {
    createdAt: 1,
    event: 1,
    userId: 1,
    username: 1,
    deviceId: 1,
    zonesNum: 1,
    ownerNum: 1,
    textData: 1,
  };

  return {
    find: function() {
      return Owners.find(
        // Make sure the current user is the owner of specified device
        { userId: this.userId, deviceId: deviceId },
        { fields: { deviceId: 1 } }
      );
    },
    children: [
      {
        find: function(owner) {
          // Find all history records for the specified device
          return History.find(
            { deviceId: owner.deviceId },
            { fields: historyFields }
          );
        }
      }
    ]
  };
});
