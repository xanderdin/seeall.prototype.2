import { Owners } from '/imports/api/owners/owners.js';


Meteor.publishComposite('owners', function(deviceId) {

  const ownersFields = {
    _id: 1,
    deviceId: 1,
    num: 1,
    userId: 1
  };

  return {

    // Find devices (or specified device) owned by current user
    find: function() {

      var qry = {
        userId: this.userId
      };

      if (deviceId) {
        qry.deviceId = deviceId;
      }

      return Owners.find(
        qry,
        { fields: { deviceId: 1 }}
      );
    },

    children: [
      {
        // Find all onwers of found devices.
        find: function(owner) {
          return Owners.find(
            { deviceId: owner.deviceId },
            { fields: ownersFields }
          );
        }
      }
    ]
  };

});
