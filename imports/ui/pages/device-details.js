import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Devices } from '/imports/api/devices/devices.js';
import { History } from '/imports/api/history/history.js';

import '/imports/api/devices/client/functions.js';

import '/imports/ui/components/loading.js';
import '/imports/ui/components/navbar-main.js';
import '/imports/ui/components/device-details.js';

import './device-details.html';


Template.DeviceDetails_page.onCreated(function() {

  this.getDeviceId = () => FlowRouter.getParam('_id');

  this.autorun(() => {
    this.subscribe('devices', this.getDeviceId());
    this.subscribe('history', this.getDeviceId());
    this.subscribe('owners', this.getDeviceId());
    this.subscribe('zones', this.getDeviceId());
    this.subscribe('users');
  });
});


Template.DeviceDetails_page.helpers({
  device() {
    return Devices.findOne(
      { _id: Template.instance().getDeviceId() }
    );
  }
});


Template.DeviceDetails_page.events({
  'click .js-card-device'(event) {
    event.preventDefault();
    FlowRouter.go('Devices.show');
  }
});
