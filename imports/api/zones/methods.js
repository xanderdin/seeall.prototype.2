import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Devices } from '/imports/api/devices/devices.js';
import { History } from '/imports/api/history/history.js';
import { Owners } from '/imports/api/owners/owners.js';
import { Zones } from '/imports/api/zones/zones.js';


export const setZoneArmed = new ValidatedMethod({

  name: 'zones.setArmed',

  validate: new SimpleSchema({
    zoneId: { type: String },
    isArmed: { type: Boolean }
  }).validator(),

  run({ zoneId, isArmed }) {

    if (!this.userId) {
      throw new Meteor.Error(
        'not-logged-in',
        'Must be logged in before using a device.'
      );
    }

    const zone = Zones.findOne(
      { _id: zoneId },
      { fields: { _id: 1, deviceId: 1, num: 1 }}
    );

    if (!zone) {
      return;
    }

    // Check if user is owning this device
    const owner = Owners.findOne(
      { deviceId: zone.deviceId, userId: this.userId },
      { fields: { _id: 1 }}
    );

    if (!owner) {
      throw new Meteor.Error(
        'not-device-owner',
        'Must own this device before using it.'
      );
    }

    Zones.update(

      {
        _id: zone._id,
        type: { $ne: 'siren' }
      },

      {
        $set: { "isArmed": isArmed }
      },

      function(error, result) {

        if (error) {

          console.log(error);

        } else {

          var zonesNums = [];

          zonesNums.push(zone.num);

          Meteor.call(
            'writeHistory',
            {
              event: isArmed ? 'History.cmd_arm' : 'History.cmd_disarm',
              deviceId: zone.deviceId,
              zonesNums: zonesNums
            }
          );
        }
      }
    );
  }
});


export const updateZone = new ValidatedMethod({

  name: 'zones.udpate',

  validate: new SimpleSchema({
    zoneId: { type: String },
    zoneName: { type: String, max: 128 }
  }).validator(),

  run({ zoneId, zoneName }) {

    if (!this.userId) {
      throw new Meteor.Error(
        'not-logged-in',
        'Must be logged in before updating a zone.'
      );
    }

    const zone = Zones.findOne(
      { _id: zoneId },
      { fields: { _id: 1, deviceId: 1, num: 1 }}
    );

    if (!zone) {
      return;
    }

    // Check if user is owning this device
    const owner = Owners.findOne(
      { deviceId: zone.deviceId, userId: this.userId },
      { fields: { _id: 1 }}
    );

    if (!owner) {
      throw new Meteor.Error(
        'not-device-owner',
        'Must own this device before using it.'
      );
    }

    Zones.update(

      { _id: zone._id },

      { $set: { name: zoneName } },

      function(error, result) {

        if (error) {

          console.log(error);

        } else {

          Meteor.call(
            'writeHistory',
            {
              event: 'History.zone_name_set',
              deviceId: zone.deviceId,
              zoneNum: zone.num,
              zoneNewName: zoneName
            }
          );

        }
      }
    );
  }
});


export const removeZone = new ValidatedMethod({

  name: 'zones.remove',

  validate: new SimpleSchema({
    zoneId: { type: String }
  }).validator(),

  run({ zoneId }) {

    if (!this.userId) {
      throw new Meteor.Error(
        'not-logged-in',
        'Must be logged in before removing a zone.'
      );
    }

    const zone = Zones.findOne(
      { _id: zoneId },
      { fields: { _id: 1, deviceId: 1, num: 1 }}
    );

    if (!zone) {
      return;
    }

    // Check if user is owning this device
    const owner = Owners.findOne(
      { deviceId: zone.deviceId, userId: this.userId },
      { fields: { _id: 1 }}
    );

    if (!owner) {
      throw new Meteor.Error(
        'not-device-owner',
        'Must own this device before using it.'
      );
    }

    Zones.remove(

      { _id: zone._id },

      function(error, result) {

        if (error) {

          console.log(error);

        } else {

          Meteor.call(
            'writeHistory',
            {
              event: 'History.zone_removed',
              deviceId: zone.deviceId,
              zoneNum: zone.num
            }
          );
        }
      }
    );
  }
});
