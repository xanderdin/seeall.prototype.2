import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { TAPi18n } from 'meteor/tap:i18n';

import { PreferenceVar } from 'meteor/3stack:preferences';
import { LocalPreferenceStore } from 'meteor/3stack:preferences-local-storage';

import './routes.js';
import './helpers.js';


getBrowserLanguage = function() {

  var browserLang = window.navigator.userLanguage
    || window.navigator.language || window.navigator.browserLanguage;

  var key;

  for (key in TAPi18n.getLanguages()) {
    if (browserLang.match(key)) {
      return key;
    }
  }

  return 'en';
};


Meteor.startup(function() {

  prefClientLanguage = new PreferenceVar('clientLanguage', getBrowserLanguage(), LocalPreferenceStore);

  Session.set('showLoadingIndicator', true);

  // TAPi18n.setLanguage(getBrowserLanguage())
  TAPi18n.setLanguage(prefClientLanguage.get())
    .done(function() {
      Session.set('showLoadingIndicator', false);
    })
    .fail(function(errorMessage) {
      // Handle the situation
      console.log(errorMessage);
    });
});
