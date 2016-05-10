import React from "react";

import { Meteor } from 'meteor/meteor';

import Footer from "./components/layout/Footer";
import Nav from "./components/layout/Nav";

export default class Layout extends React.Component {
  getChildContext() {
    return {
      currentUser: Meteor.user(),
    };
  }

  render() {
    const {location} = this.props;
    const containerStyle = {
      marginTop: "60px"
    };

    return (
      <div>
        <Nav location={ location } />
        <div className="container" style={ containerStyle }>
          <div className="row">
            <div className="col-lg-12">
              { this.props.children }
            </div>
          </div>
          <Footer/>
        </div>
      </div>

      );
  }
}

Layout.propTypes = {
  currentUser: React.PropTypes.object,
}

Layout.childContextTypes = {
  currentUser: React.PropTypes.object,
}