import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

var styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px'
  }
}

function Loading(props) {

  const [text, setText] = useState(props.text);

  useEffect(() => {
    const stopper = props.text + '...';
    const interval = window.setInterval(() => {
      if (text === stopper) {
        setText(props.text);
      } else {
        setText(text + '.');
      }
    }, props.speed);

    return function cleanup() {
      window.clearInterval(interval);
    }
  });
  
  return (
    <p style={styles.content}>
      {text}
    </p>
  )
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
};

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
};

export default Loading;