import React from 'react';

import CommentItem from './Item';

class CommentList extends React.Component {
  renderComments(data) {
    let filteredData = data;

    // if (this.state.hideStatus) {
    //   filteredData = filteredData.filter(data => !data.checked);
    // }

    if (filteredData.length <= 0) {
      return (
        <span class="text-info">No Comments submitted.</span>
        );
    }

    return filteredData.map((comment) => {
      return (
        <CommentItem key={ comment._id } comment={ comment } />
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
      <div className="well media-list">
        { this.renderComments(data) }
      </div>
      );
  }
}

CommentList.propTypes = {
  loading: React.PropTypes.bool,
  data: React.PropTypes.array,
};

export default CommentList;