import { PreferenceVar } from 'meteor/3stack:preferences';
import { LocalPreferenceStore } from 'meteor/3stack:preferences-local-storage';

import './at-config.js';  // must be before routes
import './routes.js';
import './helpers.js';
import './funcs.js';


prefClientLanguage = new PreferenceVar(
  'clientLanguage',
  getBrowserLanguage(),
  LocalPreferenceStore
);

setUiLanguage(prefClientLanguage.get());
