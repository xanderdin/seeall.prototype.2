import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './modal-zone-remove.html';


Template.ZoneRemove_modal.events({
  'click .js-zone-remove-ok'(event, instance) {
    Meteor.reconnect();
    Meteor.call('removeZone', this.zone._id);
  }
});
