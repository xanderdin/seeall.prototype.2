cmdArmDevice = function(deviceId) {
  Meteor.call('setDeviceArmed', deviceId, true);
};


cmdDisarmDevice = function(deviceId) {
  Meteor.call('setDeviceArmed', deviceId, false);
};


cmdGetDeviceState = function(deviceId) {
  Meteor.call('getDeviceState', deviceId);
};


// getDeviceColorClass = function(device) {
//
//   if (device.isOff) {
//     return 'grey';
//   }
//   if (device.isFailure === true) {
//     return 'red accent-4';
//   }
//   if (device.isArmed() && device.isInAlarm()) {
//     return 'red accent-3';
//   }
//   if (device.isArmed()) {
//     return 'teal accent-3';
//   }
//
//   return 'grey';
// };
//
//
// getDeviceColorStyle = function(device) {
//
//   if (device.isOff) {
//     return 'grey';
//   }
//   if (device.isFailure === true) {
//     return '#d50000';
//   }
//   if (device.isArmed() && device.isInAlarm()) {
//     return '#ff1744';
//   }
//   if (device.isArmed()) {
//     return '#1de9b6';
//   }
//
//   return 'grey';
// };
