import { Meteor } from 'meteor/meteor';
import { createContainer, ReactMeteorData } from 'meteor/react-meteor-data';

import { Users as UsersCollection } from '../../api/Users/collection';
import { Assets as AssetsCollection } from '../../api/Assets/collection';

import UserPage from '../pages/User';

export default createContainer((props) => {
  let {id} = props.params;

  let subscriptionHandler = Meteor.subscribe('user', id);
  
  const user = UsersCollection.findOne(id);
  const assets = AssetsCollection.find({userId: id}).fetch();

  let loading = !subscriptionHandler.ready();
  let userExists = !loading && !!user;

  return {
    loading,
    userExists,
    user,
    assets
  };
}, UserPage);