import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { TAPi18n } from 'meteor/tap:i18n';

import './routes.js';
import './helpers.js';


getUserLanguage = function() {
  // TODO: logic for determining the user language

  var browserLang = window.navigator.userLanguage
    || window.navigator.language || window.navigator.browserLanguage;

  console.log(browserLang);

  var key;

  for (key in TAPi18n.getLanguages()) {
    if (browserLang.match(key)) {
      console.log(key);
      return key;
    }
  }

  return 'en';
};


Meteor.startup(function() {

  Session.set('showLoadingIndicator', true);

  TAPi18n.setLanguage(getUserLanguage())
    .done(function() {
      Session.set('showLoadingIndicator', false);
    })
    .fail(function(errorMessage) {
      // Handle the situation
      console.log(errorMessage);
    });
});
