import React from 'react';
import { Link } from 'react-router';

import UsersAvatar from '../Users/Avatar';

import { Users } from '../../../api/Users/collection';

export default class Menu extends React.Component {
  renderLoggedIn() {
    const {currentUser} = this.context;
    const {logout} = this.props;

    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link className="user-name btn btn-default" to={Users.getProfileUrl(currentUser)}>
          <UsersAvatar user={currentUser} size="small" link={false} /> &nbsp;
          {Users.getDisplayName(currentUser)}
          </Link>
        </li>
        <li>
          <Link to="/" className="btn btn-default" onClick={logout}> Logout
          </Link>
        </li>
      </ul>
      );
  }

  renderLoggedOut() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to="/login" className="btn btn-default"> Login
          </Link>
        </li>
        <li>
          <Link to="/register" className="btn btn-default"> Register
          </Link>
        </li>
      </ul>
      );
  }

  render() {
    return this.context.currentUser
      ? this.renderLoggedIn()
      : this.renderLoggedOut();
  }
}

Menu.propTypes = {
  logout: React.PropTypes.func,
};

Menu.contextTypes = {
  currentUser: React.PropTypes.object,
}