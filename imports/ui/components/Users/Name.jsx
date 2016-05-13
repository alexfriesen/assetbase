import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import { Users } from '../../../api/Users/collection';

const UserName = ({user}) => <Link className="user-name" to={ Users.getProfileUrl(user) }>
                             { Users.getDisplayName(user) }
                             </Link>

UserName.propTypes = {
  user: React.PropTypes.object.isRequired,
}

export default UserName;