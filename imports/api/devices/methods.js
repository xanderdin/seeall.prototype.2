import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Devices } from '/imports/api/devices/devices.js';
import { History } from '/imports/api/history/history.js';
import { Owners } from '/imports/api/owners/owners.js';
import { Zones } from '/imports/api/zones/zones.js';

import { writeHistory } from '/imports/api/history/methods.js';


export const addNewDevice = new ValidatedMethod({

  name: 'devices.addNew',

  validate: new SimpleSchema({
    ownerNum: {
      type: Number,
      min: 1,
      max: 32
    },
    deviceId: {
      type: String,
      regEx: /^[0-9a-f]{12}$/
    },
    deviceName: {
      type: String,
      max: 128,
      optional: true
    }
  }).validator(),

  run({ ownerNum, deviceId, deviceName }) {

    if (!this.userId) {
      throw new Meteor.Error(
        'not-logged-in',
        'Must be logged in before creating a device.'
      );
    }

    // Check if device is already present in DB
    const oldDevice = Devices.findOne(
      { _id: deviceId },
      { fields: { _id: 1 }}
    );

    if (oldDevice) { // device is in DB

      // Check if user is already added to this device

      const owner = Owners.findOne(
        { deviceId: oldDevice._id, userId: this.userId },
        { fields: { userId: 1 }}
      );

      if (!owner) {

        Owners.insert(

          {
            deviceId: oldDevice._id,
            num: ownerNum,
            userId: this.userId
          },

          function(error, result) {

            writeHistory.call(
              {
                event: 'owner_added',
                deviceId: oldDevice._id
              },
              (err, res) => {
                if (err) {
                  console.log(err);
                }
              }
            );
          }
        );
      }

      return oldDevice._id;

    } else { // device is not in DB

      const userId = this.userId; // required because of the callback function

      return Devices.insert(

        {
          _id: deviceId,
          name: deviceName
        },

        function(error, result) {

          if (error) {

            console.log(error);

          } else {

            writeHistory.call(
              {
                event: 'device_added',
                deviceId: deviceId
              },
              (err, res) => {
                if (err) {
                  console.log(err);
                }
              }
            );

            Owners.insert(
              {
                deviceId: deviceId,
                num: ownerNum,
                userId: userId
              }
            );

            //FIXME: Only for demo. Remove it later. =================
            var i;
            for (i = 0; i < 16; i++) {
              Zones.insert({ deviceId: deviceId, num: i + 1 });
            }
            //========================================================
          }
        }
      );
    }
  }
});


export const updateDevice = new ValidatedMethod({

  name: 'devices.update',

  validate: new SimpleSchema({
    deviceId: {
      type: String,
      regEx: /^[0-9a-f]{12}$/
    },
    deviceName: {
      type: String,
      max: 128
    }
  }).validator(),

  run({ deviceId, deviceName }) {

    if (!this.userId) {
      throw new Meteor.Error(
        'not-logged-in',
        'Must be logged in before updating a device.'
      );
    }

    // Check if user is owning this device
    const owner = Owners.findOne(
      { deviceId: deviceId, userId: this.userId },
      { fields: { _id: 1 }}
    );

    if (!owner) {
      throw new Meteor.Error(
        'not-device-owner',
        'Must own this device before updating it.'
      );
    }

    Devices.update(

      { _id: deviceId }, // selector

      { $set: { name: deviceName } },  // modifier

      { removeEmptyStrings: false },  // options

      function(error, result) {  // callback

        if (error) {

          console.log(error);

        } else {

          writeHistory.call(
            {
              event: 'device_name_set',
              deviceId: deviceId,
              textData: deviceName
            },
            (err, res) => {
              if (err) {
                console.log(err);
              }
            }
          );
        }
      }
    );
  }
});


export const removeDevice = new ValidatedMethod({

  name: 'devices.remove',

  validate: new SimpleSchema({
    deviceId: {
      type: String,
      regEx: /^[0-9a-f]{12}$/
    }
  }).validator(),

  run({ deviceId }) {

    if (!this.userId) {
      throw new Meteor.Error(
        'not-logged-in',
        'Must be logged in before removing a device.'
      );
    }

    // Check if user is owning this device
    const owner = Owners.findOne(
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
    const otherOwners = Owners.find(
      { deviceId: deviceId, userId: { $ne: this.userId } }
    ).fetch();

    if (otherOwners) { // Remove user from owners list

      Owners.remove(

        { deviceId: deviceId, userId: this.userId },

        function(error, result) {
          if (error) {

            console.log(error);

          } else {

            writeHistory.call(
              {
                event: 'owner_removed',
                deviceId: deviceId
              },
              (err, res) => {
                if (err) {
                  console.log(err);
                }
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

            writeHistory.call(
              {
                event: 'device_removed',
                deviceId: deviceId
              },
              (err, res) => {
                if (err) {
                  console.log(err);
                }
              }
            );
          }
        }
      );
    }
  }
});


export const getDeviceState = new ValidatedMethod({

  name: 'devices.getState',

  validate: new SimpleSchema({
    deviceId: {
      type: String,
      regEx: /^[0-9a-f]{12}$/
    }
  }).validator(),

  run({ deviceId }) {

    if (!this.userId) {
      throw new Meteor.Error(
        'not-logged-in',
        'Must be logged in before using a device.'
      );
    }

    // Check if user is owning this device
    const owner = Owners.findOne(
      { deviceId: deviceId, userId: this.userId },
      { fields: { _id: 1 }}
    );

    if (!owner) {
      throw new Meteor.Error(
        'not-device-owner',
        'Must own this device before using it.'
      );
    }

    writeHistory.call(
      {
        event: 'cmd_get_state',
        deviceId: deviceId
      },
      (err, res) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }
});


export const setDeviceArmed = new ValidatedMethod({

  name: 'devices.setArmed',

  validate: new SimpleSchema({
    deviceId: {
      type: String,
      regEx: /^[0-9a-f]{12}$/
    },
    isArmed: {
      type: Boolean
    }
  }).validator(),

  run({ deviceId, isArmed }) {

    if (!this.userId) {
      throw new Meteor.Error(
        'not-logged-in',
        'Must be logged in before using a device.'
      );
    }

    // Check if user is owning this device
    const owner = Owners.findOne(
      { deviceId: deviceId, userId: this.userId },
      { fields: { _id: 1 }}
    );

    if (!owner) {
      throw new Meteor.Error(
        'not-device-owner',
        'Must own this device before using it.'
      );
    }

    const zones = Zones.find(
      {
        deviceId: deviceId,
        type: { $ne: 'siren' },
        isArmed: { $ne: isArmed }
      },
      { fields: { _id: 1, num: 1 }}
    );

    var zonesIds = [];
    var zonesNum = [];

    zones.forEach(function(zone) {
      zonesIds.push(zone._id);
      zonesNum.push(zone.num)
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

          writeHistory.call(
            {
              event: isArmed ? 'cmd_arm' : 'cmd_disarm',
              deviceId: deviceId,
              zonesNum: zonesNum
            },
            (err, res) => {
              if (err) {
                console.log(err);
              }
            }
          );
        }
      }
    );
  }
});
