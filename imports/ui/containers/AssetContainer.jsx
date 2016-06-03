import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Assets as AssetsCollection } from '../../api/Assets/collection';
import { Users as UsersCollection } from '../../api/Users/collection';

import AssetPage from '../pages/Asset';

export default createContainer((props) => {
  let {id} = props.params;

  let dataHandle = Meteor.subscribe('asset', id);
  const asset = AssetsCollection.findOne(id);
  let user = null;
  if (asset && asset.userId) {
    user = UsersCollection.findOne(asset.userId);
  }

  let loading = !dataHandle.ready();
  let dataExists = !loading && !!asset && !!user;

  return {
    loading,
    dataExists,
    asset,
    user
  };
}, AssetPage);

