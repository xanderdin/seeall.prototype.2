import { Meteor } from 'meteor/meteor';

import { Devices } from '/imports/api/devices/devices.js';


Meteor.publishComposite('usersList', function(deviceId) {

  // if (!this.userId) {
  //   return this.ready();
  // }

  // return Meteor.users.find({}, { fields: { _id: 1, username: 1 } });

  return {
    find: function() {
      // We need to return only users of the same devices which the current
      // user owns. First, we select the current user himself.
      return Meteor.users.find({ _id: this.userId }, { fields: { _id: 1 } });
    },
    children: [
      {
        find: function(user) {
          // For the selected user we select a specified device or all devices
          // belonging to him.
          var qry;
          if (deviceId) {
            qry = { _id: deviceId, "users._id": user._id };
          } else {
            qry = { "users._id": user._id };
          }
          return Devices.find(qry, { fields: { _id: 1, users: 1 } });
        },
        children: [
          {
            find: function(device) {
              // For the selected devices we select users sharing those
              // devices.
              var usersIds = [];
              device.users.forEach(function(user) {
                usersIds.push(user._id);
              });
              return Meteor.users.find(
                { _id: { $in: usersIds } },
                { fields: { _id: 1, username: 1 } }
              );
            }
          }
        ]
      }
    ]
  };
});
