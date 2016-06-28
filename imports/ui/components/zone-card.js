import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

// import '/imports/api/devices/zones.js';

import './modal-zone-edit.js';
import './modal-zone-remove.js';

import './zone-status-line.js';

import './zone-card.css';
import './zone-card.html';


Template.Zone_card.onRendered(() => {

  var instance = Template.instance();

  // Zone menu
  instance.$('.zone-context-menu-btn').dropdown(
    {
      // inDuration: 300,
      // outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      // hover: true, // Activate on hover
      // gutter: 0, // Spacing from edge
      //gutter: 10,
      // belowOrigin: false, // Displays dropdown below the button
      belowOrigin: true,
      alignment: 'left' // Displays dropdown with edge aligned to the left of button
      // alignment: 'right'
    }
  );

  // Zone edit dialog
  instance.$('.modal-trigger').leanModal(
    // {
    //   dismissible: true, // Modal can be dismissed by clicking outside of the modal
    //   opacity: .5, // Opacity of modal background
    //   in_duration: 300, // Transition in duration
    //   out_duration: 200, // Transition out duration
    //   ready: function() { alert('Ready'); }, // Callback for Modal open
    //   complete: function() { alert('Closed'); } // Callback for Modal close
    // }
  );
});


Template.Zone_card.events({
  'click .js-zone-arm'(event) {
    event.preventDefault();
    Meteor.reconnect();
    Meteor.call('setZoneArmed', this.zone._id, true);
  },
  'click .js-zone-disarm'(event) {
    event.preventDefault();
    Meteor.reconnect();
    Meteor.call('setZoneArmed', this.zone._id, false);
  }
  // 'click .js-zone-edit'(event) {
  //   event.preventDefault();
  //   console.log('Edit zone');
  // },
  // 'click .js-zone-remove'(event) {
  //   event.preventDefault();
  //   console.log('Remove zone');
  // }
});
