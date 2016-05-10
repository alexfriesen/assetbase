import React, { Component, PropTypes } from 'react';

export default class Modal extends Component {
  render() {

    const className = "modal " + this.props.open ? "fade in" : "";

    return (
      <div className={ className }>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true">
                &times;
              </button>
              { this.props.header }
            </div>
            <div className="modal-body">
              { this.props.content }
            </div>
            <div className="modal-footer">
              { this.props.footer }
            </div>
          </div>
        </div>
      </div>
      );
  }
}

Modal.propTypes = {
  header: PropTypes.object,
  content: PropTypes.object,
  footer: PropTypes.object,

  open: PropTypes.bool,
};