import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';
import { Session } from 'meteor/session';

import '/imports/ui/components/navbar-main.js';

import './settings.html';


Template.Settings_page.helpers({
  languages() {
    var currentLang = TAPi18n.getLanguage();
    var langs = TAPi18n.getLanguages();
    var key;
    var lang;
    var langsArray = [];
    for (key in langs) {
      lang = langs[key];
      lang._id = key;
      if (key === currentLang) {
        lang.selected = true;
      }
      langsArray.push(lang);
    }
    return langsArray;
  }
});


Template.Settings_page.onRendered(function(){

  var instance = Template.instance();

  // Init 'select' elements
  instance.$('select').material_select();

});


Template.Settings_page.events({

  'change #js-language'(event, instance) {

    var selectedLang = event.target.value;

    Session.set('showLoadingIndicator', true);

    TAPi18n.setLanguage(selectedLang)
      .done(function() {
        prefClientLanguage.set(selectedLang);
        Session.set('showLoadingIndicator', false);
      })
      .fail(function(errorMessage) {
        // Handle the situation
        console.log(errorMessage);
      });
  }
});
