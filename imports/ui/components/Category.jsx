import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class Category extends React.Component {

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
  category: React.PropTypes.object.isRequired,
};