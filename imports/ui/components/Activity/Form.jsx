import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';


// Task component - represents a single todo item
export default class ActivityForm extends Component {
  handleSubmit(event) {
    event.preventDefault();

    const campId = this.props.campId;

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('activities.insert', campId, {
      type: "news",
      text
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  render() {
    const {data} = this.props;
    return (
      <div className="well">
        <form className="form-horizontal" onSubmit={ this.handleSubmit.bind(this) }>
          <fieldset>
            <legend>
              New Activity
            </legend>
            <div className="input-group">
              <textarea className="form-control" ref="textInput" rows="1"></textarea>
              <span className="input-group-btn"><button type="submit" className="btn btn-primary"> Submit </button></span>
            </div>
          </fieldset>
        </form>
      </div>
      );
  }
}
