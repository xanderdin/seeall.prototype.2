import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { Devices } from '/imports/api/devices/devices.js';
import { Zones } from '/imports/api/zones/zones.js';
import { Owners } from '/imports/api/owners/owners.js';


Meteor.startup(function() {

  // FIXME: The following code is for demo purposes only. Remove it in
  // production.

	if (Meteor.users.find().count() !== 0) {
		return;
	}

	if (Devices.find().count() !== 0) {
		return;
	}


	Accounts.createUser({
		username: 'aaa',
		password: 'asdf',
		email: 'aaa@example.com'
	});


	Accounts.createUser({
		username: 'bbb',
		password: 'zxcv',
		email: 'bbb@example.com'
	});


	Accounts.createUser({
		username: 'ccc',
		password: 'qwer',
		email: 'ccc@example.com'
	});


	var devices = [
		{
			_id: '030400000001',
			name: 'Home',
			isOnline: true,
			isTamperOpen: false,
			isBatteryLow: true,
			isPowerLost: false,
			isFailure: false,
			isOff: false,
			//simBalance:
		},
		{
			_id: '030400000002',
			name: 'Garage',
			isOnline: true,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isFailure: false,
			isOff: false,
			//simBalance:
		},
		{
			_id: '030400000003',
			name: 'Office',
			isOnline: true,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isFailure: false,
			isOff: false,
			//simBalance:
		},
		{
			_id: '030400000004',
			name: 'My home',
			isOnline: true,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: true,
			isFailure: false,
			isOff: false,
			//simBalance:
		},
		{
			_id: '030400000005',
			name: 'Huge building',
			isOnline: true,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isFailure: false,
			isOff: false,
			//simBalance:
		}
	];

	var zones = [
		{
			deviceId: '030400000001',
			num: 1,
			//type:
			name: 'Door',
			//state:
			isArmed: true,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000001',
			num: 2,
			//type:
			name: 'Entrance',
			//state:
			isArmed: true,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000001',
			num: 3,
			//type:
			name: 'Living room',
			//state:
			isArmed: true,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000001',
			num: 4,
			//type:
			name: 'Bed room',
			//state:
			isArmed: true,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000002',
			num: 1,
			//type:
			name: 'Gates',
			//state:
			isArmed: true,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000002',
			num: 2,
			//type:
			name: 'Front',
			//state:
			isArmed: true,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: true,
			isPowerLost: true,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000002',
			num: 3,
			//type:
			name: 'Side',
			//state:
			isArmed: true,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: true,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000002',
			num: 4,
			type: 'siren',
			name: 'Back',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: true,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000003',
			num: 1,
			//type:
			name: 'Door',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000003',
			num: 2,
			//type:
			name: 'Hall',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000003',
			num: 3,
			//type:
			name: 'Room 1',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000003',
			num: 4,
			//type:
			name: 'Conference room',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000003',
			num: 5,
			//type:
			name: 'Floor 2 perimeter',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000003',
			num: 6,
			//type:
			name: 'Secretary',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000003',
			num: 7,
			//type:
			name: 'Boss',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000003',
			num: 8,
			//type:
			name: 'Safe',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000004',
			num: 1,
			//type:
			//name: 'Door',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000004',
			num: 2,
			//type:
			//name: 'Hall',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: true,
			isFailure: false
		},
		{
			deviceId: '030400000004',
			num: 3,
			//type:
			//name: 'Room 1',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000004',
			num: 4,
			type: 'siren',
			//name: 'Conference room',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000004',
			num: 5,
			//type:
			//name: 'Floor 2 perimeter',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000004',
			num: 6,
			//type:
			//name: 'Secretary',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: true
		},
		{
			deviceId: '030400000004',
			num: 7,
			//type:
			//name: 'Boss',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000004',
			num: 8,
			//type:
			//name: 'Safe',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000004',
			num: 9,
			type: 'siren',
			//name: 'Door',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000004',
			num: 10,
			//type:
			//name: 'Hall',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000004',
			num: 11,
			//type:
			//name: 'Room 1',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000004',
			num: 12,
			//type:
			//name: 'Conference room',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000004',
			num: 13,
			//type:
			//name: 'Floor 2 perimeter',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: true,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000004',
			num: 14,
			//type:
			//name: 'Secretary',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000004',
			num: 15,
			//type:
			//name: 'Boss',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000004',
			num: 16,
			//type:
			//name: 'Safe',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 1,
			//type:
			//name: 'Door',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 2,
			//type:
			//name: 'Hall',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 3,
			//type:
			//name: 'Room 1',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 4,
			//type:
			//name: 'Conference room',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: true,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 5,
			//type:
			//name: 'Floor 2 perimeter',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 6,
			//type:
			//name: 'Secretary',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 7,
			//type:
			//name: 'Boss',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 8,
			//type:
			//name: 'Safe',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 9,
			//type:
			//name: 'Door',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 10,
			//type:
			//name: 'Hall',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 11,
			//type:
			//name: 'Room 1',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 12,
			//type:
			//name: 'Conference room',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 13,
			//type:
			//name: 'Floor 2 perimeter',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 14,
			//type:
			//name: 'Secretary',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 15,
			//type:
			//name: 'Boss',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 16,
			//type:
			//name: 'Safe',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 17,
			//type:
			//name: 'Door',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 18,
			//type:
			//name: 'Hall',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 19,
			//type:
			//name: 'Room 1',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 20,
			//type:
			//name: 'Conference room',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 21,
			//type:
			//name: 'Floor 2 perimeter',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 22,
			//type:
			//name: 'Secretary',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 23,
			//type:
			//name: 'Boss',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 24,
			//type:
			//name: 'Safe',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 25,
			//type:
			//name: 'Door',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 26,
			//type:
			//name: 'Hall',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 27,
			//type:
			//name: 'Room 1',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 28,
			//type:
			//name: 'Conference room',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 29,
			//type:
			//name: 'Floor 2 perimeter',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 30,
			//type:
			//name: 'Secretary',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 31,
			//type:
			//name: 'Boss',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		},
		{
			deviceId: '030400000005',
			num: 32,
			//type:
			//name: 'Safe',
			//state:
			isArmed: false,
			isFired: false,
			//isInAlarm: false,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isLinkLost: false,
			isFailure: false
		}
	];

	var owners = [
		{
			deviceId: '030400000001',
			num: 1,
			userId: Meteor.users.findOne({username: 'aaa'})._id
		},
		{
			deviceId: '030400000002',
			num: 1,
			userId: Meteor.users.findOne({username: 'aaa'})._id
		},
		{
			deviceId: '030400000003',
			num: 1,
			userId: Meteor.users.findOne({username: 'aaa'})._id,
		},
		{
			deviceId: '030400000003',
			num: 2,
			userId: Meteor.users.findOne({username: 'bbb'})._id,
		},
		{
			deviceId: '030400000003',
			num: 3,
			userId: Meteor.users.findOne({username: 'ccc'})._id,
		},
		{
			deviceId: '030400000004',
			num: 1,
			userId: Meteor.users.findOne({username: 'bbb'})._id,
		},
		{
			deviceId: '030400000005',
			num: 1,
			userId: Meteor.users.findOne({username: 'bbb'})._id,
		},
		{
			deviceId: '030400000005',
			num: 2,
			userId: Meteor.users.findOne({username: 'ccc'})._id,
		}
	];

	devices.forEach((device) => {
		Devices.insert(device);
	});

	zones.forEach((zone) => {
		Zones.insert(zone);
	});

	owners.forEach((owner) => {
		Owners.insert(owner);
	});

	//Devices.createIndex({'zones._id': 1}, { unique: true });
});
