import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './modal-zone-edit.html';


Template.ZoneEdit_modal.helpers({
  formatZoneNum() {
    return formatZoneNum(this.zone._id);
  }
});


Template.ZoneEdit_modal.events({
  'click .js-zone-edit-ok'(event, instance) {
    var newName = instance.$('#zoneNewName_' + this.zone._id).val();
    this.zone.name = newName;
    Meteor.reconnect();
    Meteor.call('updateZone', this.deviceId, this.zone);
  }
});
