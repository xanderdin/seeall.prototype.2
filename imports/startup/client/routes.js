import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { AccountsTemplates } from 'meteor/useraccounts:core';

import '/imports/ui/layouts/app-body.js';

import '/imports/ui/pages/devices.js';
import '/imports/ui/pages/device-details.js';
import '/imports/ui/pages/settings.js';
import '/imports/ui/pages/about.js';
import '/imports/ui/pages/help.js';


FlowRouter.route('/', {
  name: 'App.root',
  action() {
    FlowRouter.go('Devices.show');
  }
});

FlowRouter.route('/devices/', {
  name: 'Devices.show',
  triggersEnter: [
     function() { Meteor.reconnect(); },
     AccountsTemplates.ensureSignedIn
   ],
  action(params, queryParams) {
    BlazeLayout.render('App_body', { main: 'Devices_page' });
  }
});

FlowRouter.route('/devices/:_id', {
  name: 'DeviceDetails.show',
  triggersEnter: [
    function() { Meteor.reconnect(); },
    AccountsTemplates.ensureSignedIn
  ],
  action(params, queryParams) {
    BlazeLayout.render('App_body', { main: 'DeviceDetails_page' } );
  }
});

FlowRouter.route('/settings/', {
  name: 'Settings',
  action(params, queryParams) {
    BlazeLayout.render('App_body', { main: 'Settings_page' });
  }
});

FlowRouter.route('/about/', {
  name: 'About',
  action(params, queryParams) {
    BlazeLayout.render('App_body', { main: 'About_page' });
  }
});

FlowRouter.route('/help/', {
  name: 'Help',
  action(params, queryParams) {
    BlazeLayout.render('App_body', { main: 'Help_page' });
  }
});


AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('resetPwd');
// AccountsTemplates.configureRoute('forgotPwd');
// AccountsTemplates.configureRoute('changePwd');
