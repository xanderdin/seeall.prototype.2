import { Template } from 'meteor/templating';

import './device-card.js';
import './history-list.js';
import './owners-grid.js';
import './zones-grid.js';
import './navbar-device-details.js';
import './btn-floating-device-actions.js';

import './device-details.html';


Template.DeviceDetails.helpers({
  zones() {
    return this.device.zones().fetch();
  },
  history() {
    return this.device.history().fetch();
  },
  owners() {
    return this.device.owners().fetch();
  }
});
