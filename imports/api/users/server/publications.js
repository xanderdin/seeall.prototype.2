import { Meteor } from 'meteor/meteor';

import { Owners } from '/imports/api/owners/owners.js';


Meteor.publishComposite('users', function() {
  return {
    find: function() {
      // Find all devices belonging to the user
      return Owners.find(
        { userId: this.userId },
        { fields: { deviceId: 1 }}
      );
    },
    children: [
      {
        find: function(device) {
          // Find all owners of those devices
          return Owners.find(
            { deviceId: device.deviceId },
            { fields: { userId: 1 } }
          );
        },
        children: [
          {
            find: function(owner) {
              // Finally find all those owners in users table
              return Meteor.users.find(
                { _id: owner.userId },
                { fields: { _id: 1, username: 1 }}
              );
            }
          }
        ]
      }
    ]
  };
});
