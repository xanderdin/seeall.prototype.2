import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { removeZone } from '/imports/api/zones/methods.js';

import './modal-zone-remove.html';


Template.ZoneRemove_modal.events({
  'click .js-zone-remove-ok'(event, instance) {
    Meteor.reconnect();
    // Meteor.call('removeZone', this.zone._id);
    removeZone.call(
      { zoneId: this.zone._id },
      (err, res) => {
        if (err) {
          alert(err);
        }
      }
    );
  }
});
