import React from "react";

import List from "../components/Asset/List";
import Authenticated from "../components/Permission/Authenticated";

export default class DashboardPage extends React.Component {

  render() {
    const {query} = this.props.location;
    const {params, assets} = this.props;

    const {currentUser} = this.context;

    let userId = null;
    if (currentUser) {
      userId = currentUser._id;
    }

    return (
      <div>
        <h1>Assets</h1>
        <Authenticated>
          <a href="/asset/new">New Asset</a>
        </Authenticated>
        <List userId={ userId } assets={assets} />
      </div>
      );
  }
}

DashboardPage.contextTypes = {
  currentUser: React.PropTypes.object,
}