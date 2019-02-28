import React from 'react';
import PropTypes from 'prop-types';
import { WinnerConsumer } from './WinnerContext';

function PlayerPreview(props) {
  const { avatar, username, children } = props;

  return (
      <WinnerConsumer>
        {(animationClass) => (
          <div className='column'>
            <img
              className={'avatar ' + animationClass}
              src={avatar}
              alt={'Avatar for ' + username}
            />
            <h2 className='username'>@{username}</h2>
            {children}
          </div>
        )}
      </WinnerConsumer>
  )
  }
  
  PlayerPreview.propTypes = {
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    children: PropTypes.node
  }

  export default PlayerPreview;