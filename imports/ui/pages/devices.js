import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Devices } from '/imports/api/devices/devices.js';

import '/imports/ui/components/loading.js';
import '/imports/ui/components/navbar-main.js';
import '/imports/ui/components/devices-grid.js';
import '/imports/ui/components/modal-device-add-new.js';
import '/imports/ui/components/btn-floating-add-new-device.js';

import './devices.html';


Template.Devices_page.onCreated(function() {
  this.subscribe('devices');
  this.subscribe('history');
});


Template.Devices_page.helpers({
  devices() {
    return Devices.find({});
  }
});


Template.Devices_page.events({
  'click .js-card-device'(event) {
    event.preventDefault();
    if (this.device) {
      FlowRouter.go('/devices/' + this.device._id);
    }
  }
});
