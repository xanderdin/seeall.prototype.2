import { Mongo } from 'meteor/mongo';

import './zones.js';

import { History } from '/imports/api/history/history.js';

export const Devices = new Mongo.Collection('devices');


Devices.helpers({

  nameOrId() {
    return this.name ? this.name : this._id;
  },

  isArmed() {
    if (this.zones) {
      var i;
      for (i = 0; i < this.zones.length; i++) {
        if (this.zones[i].type === 'siren') {
          continue;
        }
        if (this.zones[i].isArmed === true) {
          return true;
        }
      }
    }

    return false;
  },

  isInAlarm() {

    if (this.zones) {
      var i;
      for (i = 0; i < this.zones.length; i++) {
        if (isZoneInAlarm(this.zones[i])) {
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
      return '<i class="material-icons medium" style="color: ' + this.getDeviceColorStyle() + '">power_settings_new</i>';
    } else if (this.isFailure === true) {
      return '<i class="material-icons medium" style="color: ' + this.getDeviceColorStyle() + '">sentiment_very_dissatisfied</i>';
    } else if (this.isArmed() && this.isInAlarm()) {
      // return '<i class="flaticon-broken37 medium" style="color: #ff1744"></i>';
      return '<i class="material-icons medium" style="color: ' + this.getDeviceColorStyle() + '">notifications_active</i>';
    } else if (this.isArmed()) {
      return '<i class="material-icons medium" style="color: ' + this.getDeviceColorStyle() + '">lock</i>';
    } else {
      return '<i class="material-icons medium" style="color: ' + this.getDeviceColorStyle() + '">lock_open</i>';
    }
  },

  getDeviceColorClass() {
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

  getDeviceColorStyle() {
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

  // lastHistoryMessage() {
  //   var msg = 'No Info';
  //   var res = History.find({ deviceId: this._id }, { sort: [['createdAt', 'desc']], limit: 1 });
  //   if (res) {
  //     try {
  //       msg = res.fetch()[0].info;
  //     } catch(error) {
  //     }
  //   }
  //   return msg;
  // }

  lastHistoryText() {
    var res = History.find({ deviceId: this._id }, { sort: [['createdAt', 'desc']], limit: 1 });
    if (res) {
      try {
        return res.fetch()[0].text();
      } catch(error) {
      }
    }
    return '';
  }
});
