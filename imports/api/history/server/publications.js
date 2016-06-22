import { Meteor } from 'meteor/meteor';

import { History } from '/imports/api/history/history.js';
import { Devices } from '/imports/api/devices/devices.js';


Meteor.publishComposite('history', function(deviceId) {

  // if (!this.userId) {
  //   return this.ready();
  // }

  return {
    find: function() {
      // We need to return history records belonging to the current user and to
      // devices belonging to the current user. So first we're finding the user.
      return Meteor.users.find({ _id: this.userId }, { fields: { _id: 1 } });
    },
    children: [
      { // Selected user's devices
        find: function(user) {
          // For the selected user we find one device or all devices
          // belonging to the selected user.
          var qry;
          if (deviceId) {
            qry = { _id: deviceId, "users._id": user._id };
          } else {
            qry = { "users._id": user._id };
          }
          return Devices.find(qry, { fields: { _id: 1 } });
        },
        children: [
          {
            find: function(device) {
              // And finally we return all history records of the selected
              // devices of the selected user.
              return History.find({ deviceId: device._id });
            }
          }
        ]
      },
      { // Selected user's history records
        find: function(user) {
          // Here we return all history records belonging to the selected user.
          return History.find({ userId: user._id });
        }
      }
    ]
  };

  // return {
  //   find: function() {
  //     var qry;
  //     if (deviceId) {
  //       qry = { _id: deviceId, "users._id": this.userId };
  //     } else {
  //       qry = { "users._id": this.userId };
  //     }
  //     return Devices.find(qry, { fields: { _id: 1} } );
  //   },
  //   children: [
  //     {
  //       find: function(device) {
  //         var qry = {
  //           $or: [{deviceId}, {userId}]
  //         };
  //         return History.find(qry);
  //       }
  //     }
  //   ]
  // };
  //
  // if (!this.userId) {
  //   return this.ready();
  // }
  //
  // // TODO: check for parameters
  //
  // // TODO: return only those records which belong to the current user and to
  // // the current user devices.
  //
  // if (deviceId) {
  //   // return History.find({ deviceId: deviceId }, { sort: [['dateTime', 'desc']]});
  //   return History.find({ deviceId: deviceId });
  // } else {
  //   return History.find({});
  // }
});
