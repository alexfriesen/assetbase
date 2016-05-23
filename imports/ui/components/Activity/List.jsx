import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Activities as ActivitiesCollection } from '../../../api/activities/collection';

class ActivitiesList extends Component {
  renderActivities(data) {
    let filteredData = data;
    // if (this.state.hideStatus) {
    //   filteredData = filteredData.filter(data => !data.checked);
    // }
    return filteredData.map((activity) => {
      return (
        <li key={ activity._id } className="list-group-item">
          { activity.data.text }
        </li>
        );
    });
  }

  render() {
    const {loading} = this.props;

    if (loading) {
      return (
        <h1>loading...</h1>
        );
    }

    const {data} = this.props;
    return (
      <ul className="list-group">
        { this.renderActivities(data) }
      </ul>
      );
  }
}

ActivitiesList.propTypes = {
  loading: React.PropTypes.bool,
  data: PropTypes.array,
};

export default createContainer((props) => {
  let {campId} = props;
  let subscriptionHandler = Meteor.subscribe('campActivities', campId);
  let loading = !subscriptionHandler.ready();
  let data = ActivitiesCollection.find({
    campId: campId
  }).fetch();

  return {
    loading,
    data,
  };
}, ActivitiesList);