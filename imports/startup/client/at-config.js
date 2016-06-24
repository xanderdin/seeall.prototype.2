import { AccountsTemplates } from 'meteor/useraccounts:core';
import { TAPi18n } from 'meteor/tap:i18n';

import '/imports/ui/pages/auth-page.js';


// See:
// https://github.com/meteor-useraccounts/core
// https://github.com/meteor-useraccounts/core/blob/master/Guide.md
// https://github.com/meteor-useraccounts/flow-routing


AccountsTemplates.configure({
  defaultLayoutType: 'blaze',
  // showForgotPasswordLink: true,
  // enablePasswordChange: true,
  defaultTemplate: 'Auth_page',
  defaultLayout: 'App_body',
  defaultLayoutRegions: {},
  defaultContentRegion: 'main'
});


// Allow login with Username or Email
var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
    _id: 'username',
    type: 'text',
    displayName: 'username',
    required: true,
    minLength: 5,
    maxLength: 128
  },
  {
    _id: 'email',
    type: 'email',
    required: true,
    displayName: 'email',
    re: /.+@(.+){2,}\.(.+){2,}/,
    maxLength: 128
  },
  pwd
]);
