import { getDeviceState, setDeviceArmed } from '/imports/api/devices/methods.js';


cmdArmDevice = function(deviceId) {
  // Meteor.call('setDeviceArmed', deviceId, true);
  setDeviceArmed.call(
    { deviceId: deviceId, isArmed: true },
    (err, res) => {
      if (err) {
        alert(err);
      }
    }
  );
};


cmdDisarmDevice = function(deviceId) {
  // Meteor.call('setDeviceArmed', deviceId, false);
  setDeviceArmed.call(
    { deviceId: deviceId, isArmed: false },
    (err, res) => {
      if (err) {
        alert(err);
      }
    }
  );
};


cmdGetDeviceState = function(deviceId) {
  // Meteor.call('getDeviceState', deviceId);
  getDeviceState.call(
    { deviceId: deviceId },
    (err, res) => {
      if (err) {
        alert(err);
      }
    }
  );
};
