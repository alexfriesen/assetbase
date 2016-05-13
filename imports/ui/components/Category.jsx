import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
// import classnames from 'classnames';

// Task component - represents a single todo item
export default class Category extends Component {

  render() {
    const {title} = this.props;
    return (
      <div className="col-md-4">
        <h4>{ title }</h4>
        <a className="btn btn-default" href="#">More Info</a>
      </div>
      );
  }
}

Category.propTypes = {
  category: PropTypes.object.isRequired,
};