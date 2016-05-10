import React from "react";

export default class NotFound extends React.Component {
  render() {
    const {query} = this.props.location;
    const {params} = this.props;

    return (
      <div>
        <h1>404</h1>
      </div>
      );
  }
}