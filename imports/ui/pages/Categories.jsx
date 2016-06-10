import React from 'react';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

import { Categories as CategoriesCollection } from '../../api/Categories/collection';


import Category from "../components/Category";

class CategoriesPage extends React.Component {

  renderCategories() {
    let filteredFestivals = this.props.categories;
    // if (this.state.hideCompleted) {
    //   filteredFestivals = filteredFestivals.filter(festival => !festival.checked);
    // }
    return filteredFestivals.map((category) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = festival.owner === currentUserId;

      return (
        <Category key={ category._id } category={ category } showPrivateButton={ showPrivateButton } />
        );
    });
  }

  render() {
    const {query} = this.props.location;
    const {params} = this.props;
    const {article} = params;
    const {date, filter} = query;

    return (
      <div>
        <h1>Categories</h1>
        <div className="row">
          { this.renderCategories() }
        </div>
      </div>
      );
  }
}

CategoriesPage.propTypes = {
  categories: React.PropTypes.array.isRequired,
  incompleteCount: React.PropTypes.number.isRequired,
  currentUser: React.PropTypes.object,
};

export default createContainer(() => {
  Meteor.subscribe('categories');

  return {
    categories: CategoriesCollection.find({}, {
      sort: {
        createdAt: -1
      }
    }).fetch(),
    incompleteCount: CategoriesCollection.find({
      checked: {
        $ne: true
      }
    }).count(),
    currentUser: Meteor.user(),
  };
}, CategoriesPage);