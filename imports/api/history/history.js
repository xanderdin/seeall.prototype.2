import { Mongo } from 'meteor/mongo';
import { moment } from 'meteor/momentjs:moment';
import { TAPi18n } from 'meteor/tap:i18n';

import '/imports/api/devices/zones.js';

export const History = new Mongo.Collection('history');


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
          user_name: getUsername(this.userId),
          device_id: this.deviceId
        };
        break;
      case 'History.device_name_set':
        options = {
          user_name: getUsername(this.userId),
          device_new_name: this.deviceNewName
        };
        break;
      case 'History.user_removed':
      case 'History.device_removed':
        options = {
          user_name: getUsername(this.userId)
        };
        break;
      case 'History.cmd_get_state':
        options = {
          user_name: getUsername(this.userId)
        };
        break;
      case 'History.cmd_arm':
      case 'History.cmd_disarm':
        options = {
          user_name: getUsername(this.userId),
          zones_ranges: makeZonesRanges(this.zonesIds)
        };
        break;
      case 'History.zone_name_set':
        options = {
          user_name: getUsername(this.userId),
          zone_num: formatZoneNum(this.zoneId),
          zone_new_name: this.zoneNewName
        };
        break;
      case 'History.zone_removed':
        options = {
          user_name: getUsername(this.userId),
          zone_num: formatZoneNum(this.zoneId)
        };
        break;
      case 'History.user_added':
        optiont = {
          user_name: getUsername(this.userId)
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
