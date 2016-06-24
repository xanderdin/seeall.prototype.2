import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { Devices } from '/imports/api/devices/devices.js';


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
			users: [
				{ _id: Meteor.users.findOne({username: 'aaa'})._id }
			],
			zones: [
				{
					_id: 1,
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
					_id: 2,
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
					_id: 3,
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
					_id: 4,
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
				}
			]
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
			users: [
				{ _id: Meteor.users.findOne({username: 'aaa'})._id }
			],
			zones: [
				{
					_id: 1,
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
					_id: 2,
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
					_id: 3,
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
					_id: 4,
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
				}
			]
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
			users: [
				{ _id: Meteor.users.findOne({username: 'aaa'})._id },
				{ _id: Meteor.users.findOne({username: 'bbb'})._id },
				{ _id: Meteor.users.findOne({username: 'ccc'})._id }
			],
			zones: [
				{
					_id: 1,
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
					_id: 2,
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
					_id: 3,
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
					_id: 4,
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
					_id: 5,
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
					_id: 6,
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
					_id: 7,
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
					_id: 8,
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
				}
			]
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
			users: [
				{ _id: Meteor.users.findOne({username: 'bbb'})._id }
			],
			zones: [
				{
					_id: 1,
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
					_id: 2,
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
					_id: 3,
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
					_id: 4,
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
					_id: 5,
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
					_id: 6,
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
					_id: 7,
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
					_id: 8,
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
					_id: 9,
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
					_id: 10,
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
					_id: 11,
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
					_id: 12,
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
					_id: 13,
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
					_id: 14,
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
					_id: 15,
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
					_id: 16,
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
			]
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
			users: [
				{ _id: Meteor.users.findOne({username: 'bbb'})._id },
				{ _id: Meteor.users.findOne({username: 'ccc'})._id }
			],
			zones: [
				{
					_id: 1,
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
					_id: 2,
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
					_id: 3,
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
					_id: 4,
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
					_id: 5,
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
					_id: 6,
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
					_id: 7,
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
					_id: 8,
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
					_id: 9,
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
					_id: 10,
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
					_id: 11,
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
					_id: 12,
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
					_id: 13,
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
					_id: 14,
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
					_id: 15,
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
					_id: 16,
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
					_id: 17,
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
					_id: 18,
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
					_id: 19,
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
					_id: 20,
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
					_id: 21,
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
					_id: 22,
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
					_id: 23,
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
					_id: 24,
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
					_id: 25,
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
					_id: 26,
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
					_id: 27,
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
					_id: 28,
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
					_id: 29,
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
					_id: 30,
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
					_id: 31,
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
					_id: 32,
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
			]
		}
	];

	devices.forEach((device) => {
		Devices.insert(device);
	});

	//Devices.createIndex({'zones._id': 1}, { unique: true });
});
