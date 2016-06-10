import React from 'react';
import { Link } from 'react-router'
import { Meteor } from 'meteor/meteor';

import { Users } from '../../../api/Users/collection';

import UserName from '../Users/Name';
import UserAvatar from '../Users/Avatar';

class CommentItem extends React.Component {

  handleRemove(id) {
    // TODO: move to reducers
    Meteor.call('comments.remove', id);
  }

  render() {
    const {comment} = this.props;
    const {currentUser} = this.context;

    var remove = this.handleRemove.bind(this, comment._id);

    let closeButton = "";
    if (currentUser && currentUser._id === comment.userId) {
      closeButton = <button type="button" className="close" onClick={remove}>
                      &times;
                    </button>;
    }

    const user = Users.findOne(comment.userId);

    return (
      <div key={comment._id} className="media">
        <div className="media-left">
          <UserAvatar user={user} size="small" link={true} />
        </div>
        <div className="media-body">
          <h4 className="media-heading"><UserName user={user} /> {closeButton}</h4>
          {comment.text}
        </div>
      </div>
      );
  }
}

CommentItem.propTypes = {
  comment: React.PropTypes.object.isRequired,
};

CommentItem.contextTypes = {
  currentUser: React.PropTypes.object,
}

export default CommentItem;