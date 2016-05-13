import React from "react";

export default class AboutPage extends React.Component {
  render() {
    const {query} = this.props.location;
    const {params} = this.props;

    return (
      <div>
        <h1>About</h1>
      </div>
      );
  }
}