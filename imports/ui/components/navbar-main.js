import { Template } from 'meteor/templating';

import './navbar-main.html';


Template.NavbarMain.onRendered(function(){

  var instance = Template.instance();

  instance.$('.button-collapse').sideNav({
    closeOnClick: true
  });
});
