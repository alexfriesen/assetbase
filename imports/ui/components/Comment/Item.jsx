import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Comments as CommentsCollection } from '../../../api/Comments/collection';
import { Users } from '../../../api/Users/collection';

import CommentForm from './Form';

import UserName from '../Users/Name';
import UserAvatar from '../Users/Avatar';

class CommentItem extends Component {

  // getChildContext() {
  //   return {
  //     currentUser: this.props.currentUser,
  //   };
  // }

  handleRemove(id) {
    Meteor.call('comments.remove', id);
  }

  // renderChildren(data) {
  //   if (!data) {
  //     return;
  //   }
  //   const {userRole} = this.props;

  //   const filteredData = data;
  //   // if (this.state.hideStatus) {
  //   //   filteredData = filteredData.filter(data => !data.checked);
  //   // }
  //   return filteredData.map((comment) => {
  //     return (
  //       <Comment key={ comment._id } comment={ comment } currentUser={ this.props.currentUser } />
  //       );
  //   });
  // }

  render() {
    const {comment} = this.props;
    const {loading} = this.props;
    // const {children} = this.props;
    const {currentUser} = this.props;

    var remove = this.handleRemove.bind(this, comment._id);

    // let replyForm = "";
    // if(!comment.parentId) {
    //   replyForm = <CommentForm assetId={comment.assetId} parentId={comment._id} smallInput={true} currentUser={this.props.currentUser} />;
    // }

    let closeButton = "";
    if (comment.userId === currentUser._id) {
      closeButton = <button type="button" className="close" onClick={ remove }>
                      &times;
                    </button>;
    }

    const user = Users.findOne(comment.userId);

    return (
      <div key={ comment._id } className="media">
        <div className="media-left">
          <UserAvatar user={ user } size="small" link={ true } />
        </div>
        <div className="media-body">
          <h4 className="media-heading"><UserName user={ user } /> { closeButton }</h4>
          { comment.text }
        </div>
      </div>
      );
  }
}

CommentItem.propTypes = {
  loading: React.PropTypes.bool,
  comment: PropTypes.object.isRequired,
  // children: PropTypes.array,
  currentUser: PropTypes.object,
};

// CommentItem.childContextTypes = {
//   currentUser: React.PropTypes.object,
// }

export default createContainer((props) => {
  let {comment} = props;
  let subscriptionHandler = Meteor.subscribe('comments', comment._id);
  let loading = !subscriptionHandler.ready();
  // let children = CommentsCollection.find({
  //   parentId: comment._id
  // }).fetch();

  return {
    loading,
    comment,
    // children,
    currentUser: props.currentUser,
  };
}, CommentItem);