import { Meteor } from 'meteor/meteor';
import { Devices } from '/imports/api/devices/devices.js';
import { History } from '/imports/api/history/history.js';


Meteor.methods({

  addNewDevice: function(device) {

    // if (!this.userId) {
    //   throw new Meteor.Error('not-logged-in', 'Must be logged in before creating a device.');
    // }
    //
    // // TODO: check for gid validity
    // check(
    //   device,
    //   {
    //     _id: String,
    //     name: Match.Maybe(String)
    //   }
    // );

    if (device._id.length !== 12) {
      throw new Meteor.Error('device-gid-required', 'Valid device GID required');
    }

    var userId = '';
    // var userId = this.userId;

    // Check if device already present in DB
    var d = Devices.findOne(device._id);

    if (!d) { // If device is not in DB, insert it with current user id.
      device.users = [{
        _id: this.userId
        // TODO: add user number
      }];
      device.zones = [  // FIXME: Only for demo. Remove it later.
        { _id: 1, isArmed: false }, { _id: 2, isArmed: false },
        { _id: 3, isArmed: false }, { _id: 4, isArmed: false },
        { _id: 5, isArmed: false }, { _id: 6, isArmed: false },
        { _id: 7, isArmed: false }, { _id: 8, isArmed: false },
        { _id: 9, isArmed: false }, { _id: 10, isArmed: false },
        { _id: 11, isArmed: false }, { _id: 12, isArmed: false },
        { _id: 13, isArmed: false }, { _id: 14, isArmed: false },
        { _id: 15, isArmed: false }, { _id: 16, isArmed: false }
      ];
      return Devices.insert(
        device,
        function(error, result) {
          if (error) {
            //code
          } else {
            // Meteor.call('writeHistory', userId, device._id, 'New device');
            Meteor.call(
              'writeHistory',
              {
                event: 'History.device_added',
                deviceId: device._id
              }
            );
          }
        }
      );
    }

    // If device is already in DB, check if user already
    // added to this device
    for (i = 0; d.users && i < d.users.length; i++) {
      if (d.users[i]._id === this.userId) {
        return d._id;
      }
    }

    // If user is not added to present device, add him.
    Devices.update(
      d._id,
      {
        $push: {
          users: {
            _id: this.userId
            // TODO: add user number
          }
        }
      },
      function(error, result) {
        if (error) {
          //code
        } else {
          // Meteor.call('writeHistory', userId, device._id, 'User added');
          Meteor.call(
            'writeHistory',
            {
              event: 'History.user_added',
              deviceId: device._id
            }
          );
        }
      }
    );

    return d._id;
  },


  updateDevice: function(device) {

    // if (!this.userId) {
    //   throw new Meteor.Error('not-logged-in',
    //     'Must be logged in before updating a device.');
    // }
    //
    // check(
    //   device,
    //   {
    //     _id: String,
    //     name: Match.Maybe(String)
    //   }
    // );
    //
    // // Check if user is owning this device
    // var d = Devices.findOne({ _id: device._id, "users._id": this.userId });
    //
    // if (!d) { // Don't update if user is not owning this device
    //   return;
    // }

    var userId = '';
    // var userId = this.userId;

    Devices.update(
      // { _id: device._id, "users._id": userId }, FIXIME
      { _id: device._id },  // FIXME
      { $set: { name: device.name } },
      function(error, result) {
        if (error) {
          //code
        } else {
          // Meteor.call(
          //   'writeHistory',
          //   userId,
          //   device._id,
          //   'New name: ' + device.name
          // );
          Meteor.call(
            'writeHistory',
            {
              event: 'History.device_name_set',
              deviceId: device._id,
              deviceNewName: device.name
            }
          );
        }
      }
    );
  },


  removeDevice: function(deviceId) {

    // if (!this.userId) {
    //   throw new Meteor.Error('not-logged-in', 'Must be logged in before removing a device.');
    // }
    //
    // check(deviceId, String);

    var userId = '';
    // var userId = this.userId;
    //
    // // Check if user is owning this device
    // var d = Devices.findOne({ _id: deviceId, "users._id": this.userId });
    //
    // if (!d) { // Don't remove if user is not owning this device
    //   return;
    // }

    // Check if there're other users owning this device
    var dd = Devices.find(deviceId).fetch();

    var isMultiusers = false;

    for (i = 0; dd && dd.users && i < dd.users.length; i++) {
      if (dd.users[i]._id === userId) {
        continue;
      }
      isMultiusers = true;
      break;
    }

    if (isMultiusers) { // Remove user from device
      Devices.update(
        deviceId,
        {
          $pull: {
            users: {
              _id: userId
              // TODO: check user number
            }
          }
        },
        function(error, result) {
          if (error) {
            //code
          } else {
            // Meteor.call('writeHistory', userId, deviceId, 'User removed');
            Meteor.call(
              'writeHistory',
              {
                event: 'History.user_removed',
                deviceId: deviceId
              }
            );
          }
        }
      );
    } else { // Remove device
      Devices.remove(
        deviceId,
        function(error) {
          if (error) {
            //code
          } else {
            // Meteor.call('writeHistory', userId, deviceId, 'Device removed');
            Meteor.call(
              'writeHistory',
              {
                event: 'History.device_removed',
                deviceId: deviceId
              }
            );
          }
        }
      );
    }
  },


  getDeviceState: function(deviceId) {

    var userId = '';

    // if (!this.userId) {
    //   throw new Meteor.Error('not-logged-in', 'Must be logged in before using a device.');
    // }

    // Meteor.call('writeHistory', userId, deviceId, 'Get state');
    Meteor.call(
      'writeHistory',
      {
        event: 'History.cmd_get_state',
        deviceId: deviceId
      }
    );

  },


  setDeviceArmed: function(deviceId, isArmed) {

    var userId = '';
    // if (!this.userId) {
    //   throw new Meteor.Error('not-logged-in', 'Must be logged in before using a device.');
    // }

    Devices.find(deviceId).forEach(function(device) {

      if (device.zones) {
        var zonesIds = [];
        device.zones.forEach(function(zone) {
          if (zone.type !== 'siren' && zone.isArmed !== isArmed) {
            zonesIds.push(zone._id);
          }
        });

        // var zonesRanges = makeZonesRanges(zonesIds);

        // Meteor.call('writeHistory', userId, device._id, isArmed ? 'Arm ' + zonesIds : 'Disarm ' + zonesIds);
        // Meteor.call('writeHistory', userId, device._id, isArmed ? 'Arm ' + zonesRanges : 'Disarm ' + zonesRanges);
        Meteor.call(
          'writeHistory',
          {
            event: isArmed ? 'History.cmd_arm' : 'History.cmd_disarm',
            deviceId: device._id,
            // zonesRanges: zonesRanges
            zonesIds: zonesIds
          }
        );
        device.zones.forEach(function(zone) {
          Devices.update(
            {
              _id: deviceId,
              zones:
                {
                  $elemMatch:
                    {
                      _id: zone._id,
                      isArmed: !isArmed,
                      type:
                        {
                          $ne: 'siren'
                        }
                    }
                }
            },
            {
              $set:
                {
                  'zones.$.isArmed': isArmed
                }
            }
          );
        });
      }
    });
  },


  setZoneArmed: function(deviceId, zoneId, isArmed) {

    var userId = '';
    // if (!this.userId) {
    //   throw new Meteor.Error('not-logged-in', 'Must be logged in before using a device.');
    // }

    // Check if user is owning this device
    // var d = Devices.findOne({ _id: deviceId, "users._id": this.userId});
    // if (!d) { // Don't act if user is not owning this device
    //   return;
    // }

    Devices.update(
      {
        _id: deviceId,
        zones: { $elemMatch: { _id: zoneId, type: { $ne: 'siren' } } }
      },
      {
        $set: { "zones.$.isArmed": isArmed }
      },
      function(error, result) {
        if (result > 0) {
          // Meteor.call('writeHistory', userId, deviceId,
          //   isArmed ? 'Arm ' + zoneId : 'Disarm ' + zoneId);
          var zonesIds = [];
          zonesIds.push(zoneId);
          Meteor.call(
            'writeHistory',
            {
              event: isArmed ? 'History.cmd_arm' : 'History.cmd_disarm',
              deviceId: deviceId,
              zonesIds: zonesIds
            }
          );
        }
      }
    );
  },


  updateZone: function(deviceId, zone) {

    // if (!this.userId) {
    //   throw new Meteor.Error('not-logged-in', 'Must be logged in before updating a zone.');
    // }

    // check(deviceId, String);
    // check(
    //   zone,
    //   {
    //     _id: Match.Integer,
    //     name: Match.Maybe(String)
    //   }
    // );

    var userId = '';
    // var userId = this.userId;
    //
    // // Check if user is owning this device
    // var d = Devices.findOne({ _id: deviceId, "users._id": this.userId });
    //
    // if (!d) { // Don't update if user is not owning this device
    //   return;
    // }

    Devices.update(
      { _id: deviceId, "zones._id": zone._id },
      { $set: { "zones.$.name": zone.name } },
      function(error, result) {
        if (error) {
          //code
        } else {
          // Meteor.call('writeHistory', userId, deviceId,
          //   'New name for zone ' + zone._id + ': ' + zone.name);
          Meteor.call(
            'writeHistory',
            {
              event: 'History.zone_name_set',
              deviceId: deviceId,
              zoneId: zone._id,
              zoneNewName: zone.name
            }
          );
        }
      }
    );
  },


  removeZone: function(deviceId, zoneId) {

    // if (!this.userId) {
    //   throw new Meteor.Error('not-logged-in', 'Must be logged in before removing a zone.');
    // }

    // check(deviceId, String);
    // check(zoneId, Match.Integer);

    var userId = '';
    // var userId = this.userId;

    // Check if user is owning this device
    // var d = Devices.findOne({ _id: deviceId, "users._id": this.userId });
    //
    // if (!d) { // Don't remove if user is not owning this device
    //   return;
    // }

    Devices.update(deviceId,
      {
        $pull: { zones: { _id: zoneId } }
      },
      function(error, result) {
        // Meteor.call('writeHistory', userId, deviceId, 'Remove zone ' + zoneId);
        Meteor.call(
          'writeHistory',
          {
            event: 'History.zone_removed',
            deviceId: deviceId,
            zoneId: zoneId
          }
        );
      }
    );
  }

});
