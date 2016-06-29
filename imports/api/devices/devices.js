import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { History } from '/imports/api/history/history.js';
import { Owners } from '/imports/api/owners/owners.js';
import { Zones } from '/imports/api/zones/zones.js';

import '/imports/api/zones/functions.js';


class DevicesCollection extends Mongo.Collection {
  remove(selector, callback) {
    Zones.remove({ deviceId: selector });
    Owners.remove({ deviceId: selector });
    return super.remove(selector, callback);
  }
}


// export const Devices = new Mongo.Collection('devices');
export const Devices = new DevicesCollection('devices');


Devices.attachSchema(new SimpleSchema({
  _id: {
    type: String,
    regEx: /^[0-9a-f]{12}$/
  },
  name: {
    type: String,
    defaultValue: '',
    max: 128
  },
  isOnline: {
    type: Boolean,
    defaultValue: false
  },
  isTamperOpen: {
    type: Boolean,
    defaultValue: false
  },
  isBatteryLow: {
    type: Boolean,
    defaultValue: false
  },
  isPowerLost: {
    type: Boolean,
    defaultValue: false
  },
  isFailure: {
    type: Boolean,
    defaultValue: false
  },
  isOff: {
    type: Boolean,
    defaultValue: false
  },
  // simBalance: {
  //
  // },
}));


Devices.helpers({

  history() {
    return History.find(
      { deviceId: this._id },
      { sort: [['createdAt', 'desc']], limit: 300 }
    );
  },


  lastHistoryText() {

    const res = History.find(
      { deviceId: this._id },
      { sort: [['createdAt', 'desc']], limit: 1 }
    );
    try {
      return res.fetch()[0].text();
    } catch(error) {
    }

    return '';
  },


  owners() {
    return Owners.find(
      { deviceId: this._id },
      { sort: [['num', 'asc']] }
    );
  },


  zones() {
    return Zones.find(
      { deviceId: this._id },
      { sort: [['num', 'asc']] }
    );
  },


  nameOrId() {
    return this.name ? this.name : this._id;
  },


  isArmed() {

    const zones = this.zones().fetch();

    if (zones) {
      var i;
      for (i = 0; i < zones.length; i++) {
        if (zones[i].isSiren()) {
          continue;
        }
        if (zones[i].isArmed === true) {
          return true;
        }
      }
    }

    return false;
  },


  isInAlarm() {

    const zones = this.zones().fetch();

    if (zones) {
      var i;
      for (i = 0; i < zones.length; i++) {
        if (zones[i].isInAlarm()) {
          return true;
        }
      }
    }

    if (this.isTamperOpen) {
      return true;
    }

    return false;
  },


  hasAttentionInfo() {

    if (this.isOnline === false) {
       return true;
    }

    if (this.isTamperOpen === true) {
      return true;
    }

    if (this.isBatteryLow === true) {
      return true;
    }

    if (this.isPowerLost === true) {
      return true;
    }

    return false;
  },


  mainIconTag() {

    if (this.isOff === true) {
      return '<i class="material-icons medium" style="color: '
        + this.colorStyle()
        + '">power_settings_new</i>';
    } else if (this.isFailure === true) {
      return '<i class="material-icons medium" style="color: '
        + this.colorStyle()
        + '">sentiment_very_dissatisfied</i>';
    } else if (this.isArmed() && this.isInAlarm()) {
      return '<i class="material-icons medium" style="color: '
        + this.colorStyle()
        + '">notifications_active</i>';
    } else if (this.isArmed()) {
      return '<i class="material-icons medium" style="color: '
        + this.colorStyle()
        + '">lock</i>';
    } else {
      return '<i class="material-icons medium" style="color: '
        + this.colorStyle()
        + '">lock_open</i>';
    }
  },


  colorClass() {

    if (this.isOff) {
      return MyStateColors.off.classColor;
    }
    if (this.isFailure === true) {
      return MyStateColors.failure.classColor;
    }
    if (this.isArmed() && this.isInAlarm()) {
      return MyStateColors.armedInAlarm.classColor;
    }
    if (this.isArmed()) {
      return MyStateColors.armed.classColor;
    }

    return MyStateColors.unspecified.classColor;
  },


  colorStyle() {

    if (this.isOff) {
      return MyStateColors.off.styleColor;
    }
    if (this.isFailure === true) {
      return MyStateColors.failure.styleColor;
    }
    if (this.isArmed() && this.isInAlarm()) {
      return MyStateColors.armedInAlarm.styleColor;
    }
    if (this.isArmed()) {
      return MyStateColors.armed.styleColor;
    }

    return MyStateColors.unspecified.styleColor;
  },


  zonesHaveAttentionInfo() {

    const zones = this.zones().fetch();

    if (zones) {
      var i;
      for (i = 0; i < zones.length; i++) {
        if (zones[i].hasAttentionInfo()) {
          return true;
        }
      }
    }

    return false;
  }

});
