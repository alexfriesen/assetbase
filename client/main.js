import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '../imports/startup/client/index.js';
import Root from '../imports/ui/Root';

Meteor.startup(() => {
  render(<Root />, document.getElementById('app'));
});