import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { moment } from 'meteor/momentjs:moment';
import { TAPi18n } from 'meteor/tap:i18n';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import '/imports/api/zones/functions.js';


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
  deviceNewName: {
    type: String,
    optional: true
  },
  zoneNum: {
    type: Number,
    optional: true
  },
  zonesNums: {
    type: [Number],
    optional: true
  },
  zoneNewName: {
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

    // if (!this.data) {
    //   return null;
    // }

    var res = '';
    var options;

    switch (this.event) {

      case 'History.device_added':
        options = {
          user_name: this.username, //getUsername(this.userId),
          device_id: this.deviceId
        };
        break;

      case 'History.device_name_set':
        options = {
          user_name: this.username, //getUsername(this.userId),
          device_new_name: this.deviceNewName
        };
        break;

      case 'History.owner_removed':
      case 'History.device_removed':
        options = {
          user_name: this.username //getUsername(this.userId)
        };
        break;

      case 'History.cmd_get_state':
        options = {
          user_name: this.username //getUsername(this.userId)
        };
        break;

      case 'History.cmd_arm':
      case 'History.cmd_disarm':
        options = {
          user_name: this.username, //getUsername(this.userId),
          zones_ranges: makeZonesRanges(this.zonesNums)
        };
        break;

      case 'History.zone_name_set':
        options = {
          user_name: this.username, //getUsername(this.userId),
          zone_num: formatZoneNum(this.zoneNum),
          zone_new_name: this.zoneNewName
        };
        break;

      case 'History.zone_removed':
        options = {
          user_name: this.username, //getUsername(this.userId),
          zone_num: formatZoneNum(this.zoneNum)
        };
        break;

      case 'History.owner_added':
        options = {
          user_name: this.username, //getUsername(this.userId)
        };
        break;

      default:

    }

    if (options) {
      res = TAPi18n.__(this.event, options, lang);
    }

    return res;
  }
});


var getUsername = function(userId) {
  var user = Meteor.users.findOne(userId);
  if (user) {
    return user.username;
  }
  return '';
};


var makeZonesRanges = function(zonesNums) {

  var res = '';

  if (!zonesNums) {
    return res;
  }

  var i = 0;
  var j = 0;

  for (; i < zonesNums.length; i++) {

    // Simply add first number to response
    if (i === 0) {
      res = formatZoneNum(zonesNums[i]);
      j++;
      continue;
    }

    var prev_i = i - 1;

    if (zonesNums[prev_i] === zonesNums[i] - 1) { // In sequence
      if (i === zonesNums.length - 1) { // Last element
        var ch = j > 0 ? (j === 1 ? ',' : '-') : ',';
        res += (ch + formatZoneNum(zonesNums[i]));
      } else {
        j++;
      }
    } else { // Out of sequence
      if (j > 0 && prev_i > 0) { // But was in sequence (&& previous is not first)
        var ch = j === 1 ? ',' : '-';
        res += (ch + formatZoneNum(zonesNums[prev_i]));
      }
      res += (',' + formatZoneNum(zonesNums[i]));
      j = 0;
    }

  }

  return res;
};
