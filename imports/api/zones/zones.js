import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import './functions.js';


export const Zones = new Mongo.Collection('zones');


Zones.attachSchema(new SimpleSchema({
  deviceId: {
    type: String,
    regEx: /^[0-9a-f]{12}$/
  },
  num: {
    type: Number,
    min: 1,
    max: 32
  },
  name: {
    type: String,
    defaultValue: '',
    max: 128
  },
  type: {
    type: String,
    allowedValues: ['detector', 'siren'],
    defaultValue: 'detector'
  },
  //state:
  isArmed: {
    type: Boolean,
    defaultValue: false
  },
  isFired: {
    type: Boolean,
    defaultValue: false
  },
  //isInAlarm: false,
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
  isLinkLost: {
    type: Boolean,
    defaultValue: false
  },
  isFailure: {
    type: Boolean,
    defaultValue: false
  }
}));


Zones.helpers({

  formatNum() {
    return formatZoneNum(this.num);
  },


  isInAlarm() {

    // Check zone tamper state despite of 'armed' state
    if (this.isTamperOpen === true) {
      return true;
    }

    // Check other zone states only if zone is armed
    if (this.isArmed !== true) {
      return false;
    }

    if (this.isFired === true) {
      return true;
    }

    if (this.isLinkLost === true) {
      return true;
    }

    return false;
  },


  hasAttentionInfo() {

    if (this.isTamperOpen === true) {
      return true;
    }

    if (this.isLinkLost === true) {
      return true;
    }

    if (this.isBatteryLow === true) {
      return true;
    }

    if (this.isPowerLost === true) {
      return true;
    }

    if (this.isFailure === true) {
      return true;
    }

    return false;
  },


  hasAdditionalInfo() {

    if (this.isTamperOpen !== undefined && this.isTamperOpen !== null) {
      return true;
    }

    if (this.isLinkLost !== undefined && this.isLinkLost !== null) {
      return true;
    }

    if (this.isBatteryLow !== undefined && this.isBatteryLow !== null) {
      return true;
    }

    if (this.isPowerLost !== undefined && this.isPowerLost !== null) {
      return true;
    }

    if (this.isFailure !== undefined && this.isFailure !== null) {
      return true;
    }

    return false;
  },


  mainIconTag() {

    var result;

    var type = this.type ? this.type : 'detector';

    switch (type) {

      case 'detector':

        if (this.isArmed === undefined || this.isArmed === null) {
          // result = '<i class="material-icons medium" style="color: '
          //   + this.colorStyle()
          //   + '">help_outline</i>';
          result = '<i class="fa fa-question-circle-o fa-fw fa-4x" aria-hidden="true"'
            + ' style="color: ' + this.colorStyle() + '"></i>';
        } else if (this.isArmed === true && this.isInAlarm()) {
          // result = '<i class="material-icons medium" style="color: '
          //   + this.colorStyle()
          //   + '">notifications_active</i>';
          result = '<i class="fa fa-exclamation-triangle fa-fw fa-4x" aria-hidden="true"'
            + ' style="color: ' + this.colorStyle() + '"></i>';
        } else if (this.isArmed) {
          // result = '<i class="material-icons medium" style="color: '
          //   + this.colorStyle()
          //   + '">lock</i>';
          result = '<i class="fa fa-lock fa-fw fa-4x" aria-hidden="true"'
            + ' style="color: ' + this.colorStyle() + '"></i>';
        } else {
          // result = '<i class="material-icons medium" style="color: '
          //   + this.colorStyle()
          //   + '">lock_open</i>';
          result = '<i class="fa fa-unlock fa-fw fa-4x" aria-hidden="true"'
            + ' style="color: ' + this.colorStyle() + '"></i>';
        }

        break;

      case 'siren':

        // result = '<i class="material-icons medium" style="color: '
        //   + this.colorStyle()
        //   + '">volume_up</i>';
        result = '<i class="fa fa-volume-up fa-fw fa-4x" aria-hidden="true"'
          + ' style="color: ' + this.colorStyle() + '"></i>';

        break;

      default:

        // result = '<i class="material-icons medium" style="color: '
        //   + this.colorStyle()
        //   + '">help_outline</i>';
        result = '<i class="fa fa-question-circle-o fa-fw fa-4x" aria-hidden="true"'
          + ' style="color: ' + this.colorStyle() + '"></i>';

        break;
    }

    return result;
  },


  colorClass() {

    var result;

    var type = this.type ? this.type : 'detector';

    switch (type) {

      case 'detector':

        if (this.isArmed === undefined || this.isArmed === null) {
          result = MyStateColors.disarmed.classColor;
        } else if (this.isArmed === true && this.isInAlarm()) {
          result = MyStateColors.armedInAlarm.classColor;
        } else if (this.isArmed) {
          result = MyStateColors.armed.classColor;
        } else if (this.isArmed === false) {
          result = MyStateColors.disarmed.classColor;
        } else {
          result = MyStateColors.unspecified.classColor;
        }

        break;

      case 'siren':

        result = MyStateColors.unspecified.classColor;

        break;

      default:

        result = MyStateColors.unspecified.classColor;

        break;
    }

    return result;
  },


  colorStyle() {

    var result;

    var type = this.type ? this.type : 'detector';

    switch (type) {

      case 'detector':

        if (this.isArmed === undefined || this.isArmed === null) {
          result = MyStateColors.disarmed.styleColor;
        } else if (this.isArmed === true && this.isInAlarm()) {
          result = MyStateColors.armedInAlarm.styleColor;
        } else if (this.isArmed) {
          result = MyStateColors.armed.styleColor;
        } else if (this.isArmed === false) {
          result = MyStateColors.disarmed.styleColor;
        } else {
          result = MyStateColors.unspecified.styleColor;
        }

        break;

      case 'siren':

        result = MyStateColors.unspecified.styleColor;

        break;

      default:

        result = MyStateColors.unspecified.styleColor;

        break;
    }

    return result;
  },


  isSiren() {

    if (this.type === 'siren') {
      return true;
    }

    return false;
  },


  canArm() {

    if (this.isSiren()) {
      return false;
    }

    if (this.isArmed !== true) {
      return true;
    }

    return false;
  },


  canDisarm() {

    if (this.isSiren()) {
      return false;
    }

    if (this.isArmed === true) {
      return true;
    }

    return false;
  }

});
