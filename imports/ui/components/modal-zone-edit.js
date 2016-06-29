import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { updateZone } from  '/imports/api/zones/methods.js';

import './modal-zone-edit.html';


Template.ZoneEdit_modal.onRendered(function(){

  const instance = Template.instance();

  instance.$('input.js-char-count').characterCounter();

  Materialize.updateTextFields();
});


Template.ZoneEdit_modal.events({
  'click .js-zone-edit-ok'(event, instance) {
    const newName = instance.$('#zoneNewName_' + this.zone._id);
    Meteor.reconnect();
    // Meteor.call('updateZone', this.zone);
    updateZone.call(
      { zoneId: this.zone._id, zoneName: newName.val() },
      (err, res) => {
        if (err) {
          alert(err);
        }
      }
    );
  }
});
