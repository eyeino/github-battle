import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PlayerPreview from './PlayerPreview';

function PlayerInput(props) {
  
  const [username, setUsername] = useState('');

  function handleChange(event) {
    var value = event.target.value;
    setUsername(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onSubmit(username);
  }

  return (
    <form className='column' onSubmit={handleSubmit}>
      <label className='header' htmlFor='username'>
        {props.label}
      </label>
      <input
        id='username'
        placeholder='github username'
        type='text'
        autoComplete='off'
        value={username}
        onChange={handleChange} />
      <button 
        className='button'
        type='submit'
        disabled={!username}>
          Submit
      </button>
    </form>
  )
  
}

PlayerInput.propTypes = {
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

function Battle(props) {
  const [playerOneName, setPlayerOneName] = useState('');
  const [playerTwoName, setPlayerTwoName] = useState('');
  const [playerOneImage, setPlayerOneImage] = useState(null);
  const [playerTwoImage, setPlayerTwoImage] = useState(null);

  function githubImageUrlMaker(username) {
    return 'https://github.com/' + username + '.png?size200';
  }

  function handleSubmitOne(username) {
    setPlayerOneName(username);
    setPlayerOneImage(githubImageUrlMaker(username));
  }

  function handleResetOne() {
    setPlayerOneName('');
    setPlayerOneImage(null);
  }

  function handleSubmitTwo(username) {
    setPlayerTwoName(username);
    setPlayerTwoImage(githubImageUrlMaker(username));
  }

  function handleResetTwo() {
    setPlayerTwoName('');
    setPlayerTwoImage(null);
  }

  return (
    <div>
      <div className='row'>
        {!playerOneName &&
          <PlayerInput
            label='Player One'
            onSubmit={handleSubmitOne}
          />}

        {playerOneImage !== null &&
          <PlayerPreview
            avatar={playerOneImage}
            username={playerOneName}>
              <button
                className='reset'
                onClick={handleResetOne}>
                  Reset
              </button>
          </PlayerPreview>}

        {!playerTwoName &&
          <PlayerInput 
            label='Player Two'
            onSubmit={handleSubmitTwo}
          />}

        {playerTwoImage !== null &&
          <PlayerPreview
            avatar={playerTwoImage}
            username={playerTwoName}>
              <button
                className='reset'
                onClick={handleResetTwo}>
                  Reset
              </button>
          </PlayerPreview>}
      </div>
      {playerOneImage && playerTwoImage &&
        <Link
          className='button'
          to={{
            pathname: props.match.url + '/results',
            search: `?playerOneName=` + playerOneName + '&playerTwoName=' + playerTwoName
          }}>
            To battle!
        </Link>
      }
    </div>
  )
}

Battle.propTypes = {
  match: PropTypes.object.isRequired
}

export default Battle;