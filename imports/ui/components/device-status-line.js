import { Template } from 'meteor/templating';

import './device-status-line.html';


Template.DeviceStatusLine.helpers({
  isLowMoney() {
    const moneyThreshold = 10; // FIXME: Should set it from user settings
    console.log(this.device.simBalance);
    if (this.device.simBalance < moneyThreshold) {
      return true;
    }
    return false;
  }
});
