cmdArmDevice = function(deviceId) {
  Meteor.call('setDeviceArmed', deviceId, true);
};


cmdDisarmDevice = function(deviceId) {
  Meteor.call('setDeviceArmed', deviceId, false);
};


cmdGetDeviceState = function(deviceId) {
  Meteor.call('getDeviceState', deviceId);
};
