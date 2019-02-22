import React from 'react';
import PropTypes from 'prop-types';

function PlayerPreview (props) {
  const { avatar, username, children } = props;

  return (
    <div className='column'>
    <img
      className='avatar'
      src={avatar}
      alt={'Avatar for ' + username}
    />
    <h2 className='username'>@{username}</h2>
    {children}
    </div>
  )
  }
  
  PlayerPreview.propTypes = {
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    children: PropTypes.node
  }

  export default PlayerPreview;