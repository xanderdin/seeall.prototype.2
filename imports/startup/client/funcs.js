import { Session } from 'meteor/session';
import { TAPi18n } from 'meteor/tap:i18n';
import { T9n } from 'meteor/softwarerero:accounts-t9n';


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


setUiLanguage = function(lang) {

  Session.set('showLoadingIndicator', true);

  TAPi18n.setLanguage(lang)
    .done(function() {
      T9n.setLanguage(lang);
      prefClientLanguage.set(lang);
      Session.set('showLoadingIndicator', false);
    })
    .fail(function(errorMessage) {
      // Handle the situation
      console.log(errorMessage);
    });
};
