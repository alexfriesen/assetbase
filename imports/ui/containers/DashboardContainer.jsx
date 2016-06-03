import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import DashboardPage from '../pages/Dashboard';

import { Assets as AssetsCollection } from '../../api/Assets/collection';

export default createContainer(() => {
  let subscriptionHandler = Meteor.subscribe('assets');

  let loading = !subscriptionHandler.ready();

  let assets = AssetsCollection.find().fetch();

  return {
    loading,
    assets
  };
}, DashboardPage);