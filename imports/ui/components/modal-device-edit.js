import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './modal-device-edit.html';


Template.DeviceEdit_modal.events({
  'click .js-device-edit-ok'(event, instance) {
    var newName = instance.$('#deviceNewName_' + this.device._id).val();
    this.device.name = newName;
    console.log(newName);
    Meteor.call('updateDevice', this.device);
  }
});
