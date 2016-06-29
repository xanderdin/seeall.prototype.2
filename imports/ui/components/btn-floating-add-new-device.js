import { Template } from 'meteor/templating';

import './btn-floating-add-new-device.html';


Template.BtnFloating_AddNewDevice.onRendered(function() {

  const instance = Template.instance();

  instance.$('.modal-trigger').leanModal();

});
