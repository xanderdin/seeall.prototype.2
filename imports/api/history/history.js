import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { moment } from 'meteor/momentjs:moment';
import { TAPi18n } from 'meteor/tap:i18n';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import '/imports/api/zones/functions.js';
import '/imports/api/owners/functions.js';


export const History = new Mongo.Collection('history');


History.attachSchema(new SimpleSchema({
  createdAt: {
    type: Date,
    defaultValue: new Date()
  },
  event: {
    type: String
  },
  userId: {
    type: String,
    optional: true
  },
  username: {
    type: String,
    optional: true,
    max: 128
  },
  deviceId: {
    type: String,
    regEx: /^[0-9a-f]{12}$/,
    optional: true
  },
  zonesNum: {
    type: [Number],
    optional: true
  },
  ownerNum: {
    type: Number,
    optional: true
  },
  textData: {
    type: String,
    optional: true
  }
}));


History.helpers({

  date() {
    return moment(this.createdAt).format('YYYY-MM-DD');
  },

  time() {
    return moment(this.createdAt).format('HH:mm:ss');
  },

  text(lang) {

    const options = {};

    switch (this.event) {

      case 'device_added':
        options.user_name = makeUserLine(this);
        options.device_id = undefinedToEmptyString(this.deviceId);
        break;

      case 'device_name_set':
        options.user_name = makeUserLine(this);
        options.device_new_name = undefinedToEmptyString(this.textData);
        break;

      case 'owner_removed':
      case 'device_removed':
        options.user_name = makeUserLine(this);
        break;

      case 'cmd_get_state':
        options.user_name = makeUserLine(this);
        break;

      case 'cmd_arm':
      case 'cmd_disarm':
        options.user_name = makeUserLine(this);
        options.zones_ranges = makeZonesRanges(this.zonesNum);
        break;

      case 'zone_name_set':
        options.user_name = makeUserLine(this);
        options.zone_num = formatZoneNum(this.zonesNum[0]);
        options.zone_new_name = undefinedToEmptyString(this.textData);
        break;

      case 'zone_removed':
        options.user_name = makeUserLine(this);
        options.zone_num = formatZoneNum(this.zonesNum[0]);
        break;

      case 'owner_added':
        options.user_name = makeUserLine(this);
        break;

      default:
        options.defaultValue = this.event;

    }

    return TAPi18n.__('History.' + this.event, options, lang);
  }
});


const makeUserLine = function(v) {
  var res = '';
  if (v) {
    if (v.ownerNum) {
      res = formatOwnerNum(v.ownerNum);
    }
    if (v.username) {
      if (res) {
        res += '(' + v.username + ')';
      } else {
        res = v.username;
      }
    }
  }
  return res;
}


const undefinedToEmptyString = function(v) {
  return v ? v : '';
};


const getUsername = function(userId) {
  var user = Meteor.users.findOne(userId);
  if (user) {
    return user.username;
  }
  return '';
};


const makeZonesRanges = function(zonesNum) {

  var res = '';

  if (!zonesNum) {
    return res;
  }

  var i = 0;
  var j = 0;

  for (; i < zonesNum.length; i++) {

    // Simply add first number to response
    if (i === 0) {
      res = formatZoneNum(zonesNum[i]);
      j++;
      continue;
    }

    var prev_i = i - 1;

    if (zonesNum[prev_i] === zonesNum[i] - 1) { // In sequence
      if (i === zonesNum.length - 1) { // Last element
        var ch = j > 0 ? (j === 1 ? ',' : '-') : ',';
        res += (ch + formatZoneNum(zonesNum[i]));
      } else {
        j++;
      }
    } else { // Out of sequence
      if (j > 0 && prev_i > 0) { // But was in sequence (&& previous is not first)
        var ch = j === 1 ? ',' : '-';
        res += (ch + formatZoneNum(zonesNum[prev_i]));
      }
      res += (',' + formatZoneNum(zonesNum[i]));
      j = 0;
    }

  }

  return res;
};
