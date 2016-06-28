import { Meteor } from 'meteor/meteor';

import { Devices } from '/imports/api/devices/devices.js';
import { History } from '/imports/api/history/history.js';
import { Owners } from '/imports/api/owners/owners.js';
import { Zones } from '/imports/api/zones/zones.js';


Meteor.methods({

  addNewDevice: function(newDevice) {

    if (!this.userId) {
      throw new Meteor.Error(
        'not-logged-in',
        'Must be logged in before creating a device.'
      );
    }

    // Check if device is already present in DB
    var oldDevice = Devices.findOne(
      { _id: newDevice._id },
      { fields: { _id: 1 }}
    );

    if (oldDevice) { // device is in DB

      // Check if user is already added to this device

      var owner = Owners.findOne(
        { deviceId: oldDevice._id, userId: this.userId },
        { fields: { userId: 1 }}
      );

      if (!owner) {

        Owners.insert(

          { deviceId: oldDevice._id, num: 1, userId: this.userId }, // FIXME: num

          function(error, result) {

            Meteor.call(
              'writeHistory',
              {
                event: 'History.owner_added',
                deviceId: oldDevice._id
              }
            );
          }
        );
      }

      return oldDevice._id;

    } else { // device is not in DB

      var userId = this.userId; // required because of the callback function

      return Devices.insert(

        newDevice,

        function(error, result) {

          if (error) {

            console.log(error);

          } else {

            Meteor.call(
              'writeHistory',
              {
                event: 'History.device_added',
                deviceId: newDevice._id
              }
            );

            Owners.insert(
              { deviceId: newDevice._id, num: 1, userId: userId } // FIXME: num
            );

            //FIXME: Only for demo. Remove it later. =================
            var i;
            for (i = 0; i < 16; i++) {
              Zones.insert({ deviceId: newDevice._id, num: i + 1 });
            }
            //========================================================
          }
        }
      );
    }
  },


  updateDevice: function(device) {

    if (!this.userId) {
      throw new Meteor.Error(
        'not-logged-in',
        'Must be logged in before updating a device.'
      );
    }

    // Check if user is owning this device
    var owner = Owners.findOne(
      { deviceId: device._id, userId: this.userId },
      { fields: { _id: 1 }}
    );

    if (!owner) {
      throw new Meteor.Error(
        'not-device-owner',
        'Must own this device before updating it.'
      );
    }

    Devices.update(

      { _id: device._id },

      { $set: { name: device.name } },

      function(error, result) {

        if (error) {

          console.log(error);

        } else {

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

    if (!this.userId) {
      throw new Meteor.Error(
        'not-logged-in',
        'Must be logged in before removing a device.'
      );
    }

    // Check if user is owning this device
    var owner = Owners.findOne(
      { deviceId: deviceId, userId: this.userId },
      { fields: { _id: 1 }}
    );

    if (!owner) {
      throw new Meteor.Error(
        'not-device-owner',
        'Must own this device before removing it.'
      );
    }

    // Check if there're other users owning this device
    var otherOwners = Owners.find(
      { deviceId: deviceId, userId: { $ne: this.userId } }
    ).fetch();

    if (otherOwners) { // Remove user from owners list

      Owners.remove(

        { deviceId: deviceId, userId: this.userId },

        function(error, result) {
          if (error) {

            console.log(error);

          } else {

            Meteor.call(
              'writeHistory',
              {
                event: 'History.owner_removed',
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

            console.log(error);

          } else {

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

    if (!this.userId) {
      throw new Meteor.Error(
        'not-logged-in',
        'Must be logged in before using a device.'
      );
    }

    // Check if user is owning this device
    var owner = Owners.findOne(
      { deviceId: deviceId, userId: this.userId },
      { fields: { _id: 1 }}
    );

    if (!owner) {
      throw new Meteor.Error(
        'not-device-owner',
        'Must own this device before using it.'
      );
    }

    Meteor.call(
      'writeHistory',
      {
        event: 'History.cmd_get_state',
        deviceId: deviceId
      }
    );

  },


  setDeviceArmed: function(deviceId, isArmed) {

    if (!this.userId) {
      throw new Meteor.Error(
        'not-logged-in',
        'Must be logged in before using a device.'
      );
    }

    // Check if user is owning this device
    var owner = Owners.findOne(
      { deviceId: deviceId, userId: this.userId },
      { fields: { _id: 1 }}
    );

    if (!owner) {
      throw new Meteor.Error(
        'not-device-owner',
        'Must own this device before using it.'
      );
    }

    var zones = Zones.find(
      {
        deviceId: deviceId,
        type: { $ne: 'siren' },
        isArmed: { $ne: isArmed }
      },
      { fields: { _id: 1, num: 1 }}
    );

    var zonesIds = [];
    var zonesNums = [];

    zones.forEach(function(zone) {
      zonesIds.push(zone._id);
      zonesNums.push(zone.num)
    });

    Zones.update(

      {
        _id: { $in: zonesIds },
        deviceId: deviceId
      },

      { $set: { isArmed: isArmed }},

      { multi: true },

      function(error) {

        if (error) {

          console.log(error);

        } else {

          Meteor.call(
            'writeHistory',
            {
              event: isArmed ? 'History.cmd_arm' : 'History.cmd_disarm',
              deviceId: deviceId,
              zonesNums: zonesNums
            }
          );
        }
      }
    );
  }

});
