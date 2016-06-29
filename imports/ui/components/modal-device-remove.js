import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { removeDevice } from '/imports/api/devices/methods.js';

import './modal-device-remove.html';


Template.DeviceRemove_modal.events({
  'click .js-device-remove-ok'(event, instance) {
    Meteor.reconnect();
    // Meteor.call('removeDevice', this.device._id);
    removeDevice.call(
      { deviceId: this.device._id },
      (err, res) => {
        if (err) {
          alert(err);
        }
      }
    );
  }
});
