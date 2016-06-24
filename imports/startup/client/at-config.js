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
