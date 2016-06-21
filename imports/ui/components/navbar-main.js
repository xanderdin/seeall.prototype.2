import { Template } from 'meteor/templating';
import { AccountTemplates } from 'meteor/useraccounts:core';

import './navbar-main.html';


Template.NavbarMain.onRendered(function(){

  var instance = Template.instance();

  instance.$('.button-collapse').sideNav({
    closeOnClick: true
  });
});


Template.AtNavLink.events({
  'click .js-logout'(event) {
    AccountsTemplates.logout();
  }
});
