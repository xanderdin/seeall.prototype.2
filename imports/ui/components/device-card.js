import { Template } from 'meteor/templating';

import './device-status-line.js';
import './modal-device-edit.js';
import './modal-device-remove.js';

import './device-card.css';
import './device-card.html';


Template.Device_card.onRendered(() => {

  // const instance = Template.instance();
  //
  // // Device context menu
  // instance.$('.device-context-menu-btn').dropdown({
  //     // inDuration: 300,
  //     // outDuration: 225,
  //     constrain_width: false, // Does not change width of dropdown to that of the activator
  //     // hover: true, // Activate on hover
  //     // gutter: 0, // Spacing from edge
  //     //gutter: 10,
  //     // belowOrigin: false, // Displays dropdown below the button
  //     belowOrigin: true,
  //     alignment: 'left' // Displays dropdown with edge aligned to the left of button
  //     // alignment: 'right'
  //   }
  // );
  //
  // // Device dialogs
  // instance.$('.modal-trigger').leanModal(
  //   // {
  //   //   dismissible: true, // Modal can be dismissed by clicking outside of the modal
  //   //   opacity: .5, // Opacity of modal background
  //   //   in_duration: 300, // Transition in duration
  //   //   out_duration: 200, // Transition out duration
  //   //   ready: function() { alert('Ready'); }, // Callback for Modal open
  //   //   complete: function() { alert('Closed'); } // Callback for Modal close
  //   // }
  // );
});
