import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './modal-device-add-new.html';


Template.AddNewDevice_modal.events({

  'click .js-add-new-device'(event, instance) {

    var newDeviceGid = instance.$('#newDeviceGid');
    var newDeviceName = instance.$('#newDeviceName');

    if (newDeviceGid.val()) {
      Meteor.reconnect();
      Meteor.call(
        'addNewDevice',
        {
          _id: newDeviceGid.val(),
          name: newDeviceName.val()
        }
      );
      newDeviceGid.val('');
      newDeviceName.val('');
    }
  }
});
