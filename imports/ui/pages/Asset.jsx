import React, { PropTypes } from "react";
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'
import { Meteor } from 'meteor/meteor';
import { createContainer, ReactMeteorData } from 'meteor/react-meteor-data';

import { Assets as AssetsCollection } from '../../api/Assets/collection';

import AssetEdit from '../components/Asset/Edit';
import AssetDetail from '../components/Asset/Detail';

class AssetPage extends React.Component {
  // -- static childContextTypes comes with ECMA7 
  // static childContextTypes = {
  //   currentUser: React.PropTypes.object
  // };

  handleRemove() {
    const {data} = this.props;
    Meteor.call('assets.remove', data._id);
  }

  handleEdit() {
    console.log(this.props.history);
    this.props.params.method = 'edit';
    //this.props.history.push('/some/path');
  }

  render() {
    const {loading, dataExists} = this.props;
    const {currentUser} = this.context;

    console.log(currentUser);

    if (loading) {
      return (
        <h1>loading...</h1>
        );
    }

    if (this.props.params.id === 'new') {
      return (
        <AssetEdit />
        );
    }

    if (!dataExists) {
      return (
        <h1>404</h1>
        );
    }

    const {data} = this.props;

    if (!data.published && !(currentUser && currentUser._id === data.userId)) {
      return (
        <div className="row">
          <div className="col-lg-12">
            <h1>403</h1>
            <p>
              You are allowed to see this Asset!
            </p>
          </div>
        </div>
        );
    }

    if (this.props.params.method === 'edit') {
      return (
        <AssetEdit asset={ data } />
        );
    }

    return (
      <AssetDetail asset={ data } />
      );
  }
}

AssetPage.propTypes = {
  loading: React.PropTypes.bool,
  dataExists: React.PropTypes.bool,
  data: PropTypes.object,
};

AssetPage.contextTypes = {
  currentUser: React.PropTypes.object,
}

export default createContainer((props) => {
  let {id} = props.params;

  let dataHandle = Meteor.subscribe('asset', id);
  const data = AssetsCollection.findOne(id);

  let loading = !dataHandle.ready();
  let dataExists = !loading && !!data;

  return {
    loading,
    dataExists,
    data,
  };
}, AssetPage);
