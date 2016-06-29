import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { addNewDevice } from '/imports/api/devices/methods.js';

import './modal-device-add-new.html';


Template.AddNewDevice_modal.onRendered(function(){

  const instance = Template.instance();

  instance.$('input#newDeviceGid').characterCounter();
});


Template.AddNewDevice_modal.events({

  'click .js-add-new-device'(event, instance) {

    const newDeviceGid = instance.$('#newDeviceGid');
    const newDeviceUserNum = instance.$('#newDeviceUserNum');
    // const newDeviceName = instance.$('#newDeviceName');

    Meteor.reconnect();

    addNewDevice.call(
      {
        ownerNum: Number(newDeviceUserNum.val()),
        deviceId: newDeviceGid.val()  //,
        // deviceName: newDeviceName.val();
      },
      (err, res) => {
        if (err) {
          alert(err);
        } else {
          newDeviceGid.val('');
          newDeviceUserNum.val('');
          // newDeviceName.val('');
        }
      }
    );
  }
});
