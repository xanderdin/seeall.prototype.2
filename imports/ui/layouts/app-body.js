
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import '/imports/api/devices/client/functions.js';
import '/imports/ui/components/loading.js';
import './app-body.html';


// Common to many components event handlers
Template.App_body.events({
  'click .js-device-arm'(event) {
    event.preventDefault();
    if (this.device) {
      Meteor.reconnect();
      cmdArmDevice(this.device._id);
    }
  },
  'click .js-device-disarm'(event) {
    event.preventDefault();
    if (this.device) {
      Meteor.reconnect();
      cmdDisarmDevice(this.device._id);
    }
  },
  'click .js-device-state'(event) {
    event.preventDefault();
    if (this.device) {
      Meteor.reconnect();
      cmdGetDeviceState(this.device._id);
    }
  }
});
