import { Template } from 'meteor/templating';

import '/imports/api/devices/client/functions.js';
import '/imports/ui/components/loading.js';
import './app-body.html';


// Common to many components event handlers
Template.App_body.events({
  'click .js-device-arm'(event) {
    event.preventDefault();
    if (this.device) {
      cmdArmDevice(this.device._id);
    }
  },
  'click .js-device-disarm'(event) {
    event.preventDefault();
    if (this.device) {
      cmdDisarmDevice(this.device._id);
    }
  },
  'click .js-device-state'(event) {
    event.preventDefault();
    if (this.device) {
      cmdGetDeviceState(this.device._id);
    }
  }
});
