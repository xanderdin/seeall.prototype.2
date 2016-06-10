import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './modal-device-remove.html';


Template.DeviceRemove_modal.events({
  'click .js-device-remove-ok'(event, instance) {
    Meteor.call('removeDevice', this.device._id);
  }
});
