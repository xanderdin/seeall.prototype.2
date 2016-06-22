import { Template } from 'meteor/templating';
import { AccountsTemplates } from 'meteor/useraccounts:core';

import '/imports/ui/components/loading.js';

import './auth-page.html';


Template.Auth_page.helpers({
  atDisabled() {
    return AccountsTemplates.disabled();
  }
});
