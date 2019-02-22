import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PlayerPreview from './PlayerPreview';
import Loading from './Loading';

function Profile(props) {
  const { login, name, location, company, followers,
    following, public_repos, blog, avatar_url } = props.info;

  return (
    <PlayerPreview avatar={avatar_url} username={login}>
      <ul className='space-list-items'>
        {name && <li>{name}</li>}
        {location && <li>{location}</li>}
        {company && <li>{company}</li>}
        <li>Followers: {followers}</li>
        <li>Following: {following}</li>
        <li>Public Repos: {public_repos}</li>
        {blog && <li><a href={blog}>{blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired
}

function Player(props) {
  const { label, score, profile } = props;

  return (
    <div>
      <h1 className='header'>{label}</h1>
      <h3 style={{ textAlign: 'center' }}>Score: {score}</h3>
      <Profile info={profile} />
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
}

function Results(props) {
  const [winner, setWinner] = useState(null);
  const [loser, setLoser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const players = queryString.parse(props.location.search);

    api.battle([
      players.playerOneName,
      players.playerTwoName
    ]).then(function (results) {
      if (results === null) {
        setError('Looks like there was an error. Check that both users exist on Github.');
        setLoading(false);
      }

      setError(null);
      setWinner(results[0]);
      setLoser(results[1]);
      setLoading(false);
    });

  }, []);

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <Link to='/battle'>Reset</Link>
      </div>
    )
  }

  return (
    <div className='row'>
      <Player
        label='Winner'
        score={winner.score}
        profile={winner.profile}
      />
      <Player
        label='Loser'
        score={loser.score}
        profile={loser.profile}
      />
    </div>
  )
}

Results.propTypes = {
  location: PropTypes.object.isRequired
}

export default Results;