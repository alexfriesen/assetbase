import React from 'react';
import { Link } from 'react-router';

import { Users } from '../../../api/Users/collection';

const UserName = ({user, className}) => {

  return (
    <Link className={"user-name " + className} to={Users.getProfileUrl(user)}>
    {Users.getDisplayName(user)}
    </Link>
    );
}

UserName.propTypes = {
  user: React.PropTypes.object.isRequired,
  className: React.PropTypes.string,
}

export default UserName;