import { Template } from 'meteor/templating';
import { AccountTemplates } from 'meteor/useraccounts:core';

import './navbar-main.html';


Template.NavbarMain.onRendered(function(){

  // const instance = Template.instance();
  //
  // instance.$('.button-collapse').sideNav({
  //   closeOnClick: true
  // });
});


Template.NavbarMain.events({
  'click .js-logout'(event) {
    AccountsTemplates.logout();
  }
});
