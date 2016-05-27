import React, { PropTypes } from 'react';

import { Users } from '../../../api/Users/collection';

const UserAvatar = ({user, size, link}) => {

  switch (size) {
    case "small":
    case "medium":
    case "large":
      break;
    default:
      size = "medium";
  }

  const img = <img className={"avatar " + size} alt={Users.getDisplayName(user)} src={Users.getAvatarUrl(user)} />;

  if (link === true) {
    return (
      <a className={"user-avatar" + size} href={Users.getProfileUrl(user)}>
        {img}
      </a>
      );
  }
  return img;

}

UserAvatar.propTypes = {
  user: React.PropTypes.object.isRequired,
  size: React.PropTypes.string,
  link: React.PropTypes.bool
}

UserAvatar.defaultProps = {
  size: "medium",
  link: true
}

export default UserAvatar;