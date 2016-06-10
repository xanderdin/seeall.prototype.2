formatZoneNum = function(num) {
  return num < 10 ? '0' + num : num;
};


isZoneInAlarm = function(zone) {

  if (!zone) {
    return false;
  }

  // Check zone tamper state despite of 'armed' state
  if (zone.isTamperOpen === true) {
    return true;
  }

  // Check other zone states only if zone is armed
  if (zone.isArmed !== true) {
    return false;
  }

  if (zone.isFired === true) {
    return true;
  }

  if (zone.isLinkLost === true) {
    return true;
  }

  return false;
};


zoneHasAttentionInfo = function(zone) {

  if (!zone) {
    return false;
  }

  if (zone.isTamperOpen === true) {
    return true;
  }

  if (zone.isLinkLost === true) {
    return true;
  }

  if (zone.isBatteryLow === true) {
    return true;
  }

  if (zone.isPowerLost === true) {
    return true;
  }

  if (zone.isFailure === true) {
    return true;
  }

  return false;
};


zoneHasAdditionalInfo = function(zone) {

  if (!zone) {
    return false;
  }

  if (zone.isTamperOpen !== undefined && zone.isTamperOpen !== null) {
    return true;
  }

  if (zone.isLinkLost !== undefined && zone.isLinkLost !== null) {
    return true;
  }

  if (zone.isBatteryLow !== undefined && zone.isBatteryLow !== null) {
    return true;
  }

  if (zone.isPowerLost !== undefined && zone.isPowerLost !== null) {
    return true;
  }

  if (zone.isFailure !== undefined && zone.isFailure !== null) {
    return true;
  }

  return false;
};


zonesHaveAttentionInfo = function(device) {

  if (device && device.zones) {
    var i;
    for (i = 0; i < device.zones.length; i++) {
      if (zoneHasAttentionInfo(device.zones[i])) {
        return true;
      }
    }
  }

  return false;
};


getZoneMainIconTag = function(zone) {

  if (!zone) {
    return '<i class="material-icons medium" style="color: ' + getZoneColorStyle(zone) + '">help_outline</i>';
  }

  var result;

  var type = zone.type ? zone.type : 'detector';

  switch (type) {

    case 'detector':

      if (zone.isArmed === undefined || zone.isArmed === null) {
        result = '<i class="material-icons medium" style="color: ' + getZoneColorStyle(zone) + '">help_outline</i>';
      } else if (zone.isArmed === true && isZoneInAlarm(zone)) {
        result = '<i class="material-icons medium" style="color: ' + getZoneColorStyle(zone) + '">notifications_active</i>';
      } else if (zone.isArmed) {
        result = '<i class="material-icons medium" style="color: ' + getZoneColorStyle(zone) + '">lock</i>';
      } else {
        result = '<i class="material-icons medium" style="color: ' + getZoneColorStyle(zone) + '">lock_open</i>';
      }

      break;

    case 'siren':

      result = '<i class="material-icons medium" style="color: ' + getZoneColorStyle(zone) + '">volume_up</i>';

      break;

    default:

      result = '<i class="material-icons medium" style="color: ' + getZoneColorStyle(zone) + '">help_outline</i>';

      break;
  }

  return result;
};


getZoneColorClass = function(zone) {

  if (!zone) {
    return MyStateColors.unspecified.classColor;
  }

  var result;

  var type = zone.type ? zone.type : 'detector';

  switch (type) {

    case 'detector':

      if (zone.isArmed === undefined || zone.isArmed === null) {
        result = MyStateColors.disarmed.classColor;
      } else if (zone.isArmed === true && isZoneInAlarm(zone)) {
        result = MyStateColors.armedInAlarm.classColor;
      } else if (zone.isArmed) {
        result = MyStateColors.armed.classColor;
      } else {
        result = MyStateColors.unspecified.classColor;
      }

      break;

    case 'siren':

      result = MyStateColors.unspecified.classColor;

      break;

    default:

      result = MyStateColors.unspecified.classColor;

      break;
  }

  return result;
};


getZoneColorStyle = function(zone) {

  if (!zone) {
    return MyStateColors.unspecified.styleColor;
  }

  var result;

  var type = zone.type ? zone.type : 'detector';

  switch (type) {

    case 'detector':

      if (zone.isArmed === undefined || zone.isArmed === null) {
        result = MyStateColors.disarmed.styleColor;
      } else if (zone.isArmed === true && isZoneInAlarm(zone)) {
        result = MyStateColors.armedInAlarm.styleColor;
      } else if (zone.isArmed) {
        result = MyStateColors.armed.styleColor;
      } else {
        result = MyStateColors.unspecified.styleColor;
      }

      break;

    case 'siren':

      result = MyStateColors.unspecified.styleColor;

      break;

    default:

      result = MyStateColors.unspecified.styleColor;

      break;
  }

  return result;
};


isZoneSiren = function(zone) {

  if (!zone) {
    return false;
  }

  if (zone.type === 'siren') {
    return true;
  }

  return false;
}
