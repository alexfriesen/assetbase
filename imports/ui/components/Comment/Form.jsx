import React from 'react';
import { Meteor } from 'meteor/meteor';

import UserAvatar from '../Users/Avatar';

export default class CommentForm extends React.Component {
  handleSubmit(event) {
    event.preventDefault();

    const {assetId} = this.props;

    // Find the text field via the React ref
    const text = String(this.refs.textInput.value).trim();

    // TODO: move to reducers
    Meteor.call('comments.insert', assetId, text);

    // Clear form
    this.refs.textInput.value = '';
  }

  render() {
    const {currentUser} = this.context;

    if(!currentUser) {
      return null;
    }
    
    const {data} = this.props;
    const {large} = this.props;
    const {smallInput} = this.props;

    const largeClassName = large === true ? 'well' : '';

    const inputClassName = smallInput === true ? 'input-group-sm' : '';

    return (
      <div className={ largeClassName }>
        <form className="form-horizontal" onSubmit={ this.handleSubmit.bind(this) }>
          <fieldset>
            <div className={ "input-group " + inputClassName }>
              <span className="input-group-addon"><UserAvatar user={ currentUser } size="small" /></span>
              <textarea
                className="form-control"
                ref="textInput"
                rows="1"
                placeholder="sup?"></textarea>
              <span className="input-group-btn"><button type="submit" className="btn btn-primary"> Submit </button></span>
            </div>
          </fieldset>
        </form>
      </div>
      );
  }
}

CommentForm.contextTypes = {
  currentUser: React.PropTypes.object,
};