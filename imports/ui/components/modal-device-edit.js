import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { updateDevice } from '/imports/api/devices/methods.js';

import './modal-device-edit.html';


Template.DeviceEdit_modal.onRendered(function(){

  const instance = Template.instance();

  instance.$('input.js-char-count').characterCounter();

  Materialize.updateTextFields();
});


Template.DeviceEdit_modal.events({

  'click .js-device-edit-ok'(event, instance) {

    const newName = instance.$('input#deviceNewName_' + this.device._id);

    Meteor.reconnect();

    updateDevice.call(

      { deviceId: this.device._id, deviceName: newName.val() },

      (err, res) => {
        if (err) {
          alert(err);
        }
      }
    );
  }
});
