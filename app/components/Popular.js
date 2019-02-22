import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';
import Loading from './Loading';

function SelectLanguage(props) {
  const { selectedLanguage, onSelect } = props;
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className='languages'>
      {languages.map(function (lang) {
        return (
          <li
            style={lang === selectedLanguage ? { color: '#d0021b' } : null}
            onClick={onSelect.bind(null, lang)}
            key={lang}>
            {lang}
          </li>
        )
      })}
    </ul>
  )
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

function RepoGrid(props) {
  return (
    <ul className='popular-list'>
      {props.repos.map((repo, index) => {
        let { name, owner, stargazers_count } = repo;
        return (
          <li key={name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={owner.avatar_url}
                  alt={'Avatar for ' + owner.login} />
              </li>
              <li><a href={repo.html_url}>{name}</a></li>
              <li>@{owner.login}</li>
              <li>{stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
}

function Popular() {
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [repos, setRepos] = useState(null);

  useEffect(() => {
    updateLanguage(selectedLanguage);
  }, [])

  function updateLanguage(lang) {
    setSelectedLanguage(lang);
    setRepos(null);

    api.fetchPopularRepos(selectedLanguage)
      .then(fetchedRepos => {
        setRepos(fetchedRepos);
      });
  }

  return (
    <div>
      <SelectLanguage
        selectedLanguage={selectedLanguage}
        onSelect={updateLanguage}
      />
      {!repos
        ? <Loading />
        : <RepoGrid repos={repos} />}
    </div>
  )
}

export default Popular;