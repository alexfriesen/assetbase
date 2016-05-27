import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

import App from '../layouts/App';

import { Configurations } from '../../api/Configurations/collection';

export default createContainer(() => {
  let subscriptionHandler = Meteor.subscribe('configuration');
  const data = Configurations.findOne({
    active: true
  });

  let loading = !subscriptionHandler.ready();
  let dataExists = !loading && !!data;

  return {
    loading,
    configuration: data,
    user: Meteor.user(),
    connected: Meteor.status().connected,
  };
}, App);