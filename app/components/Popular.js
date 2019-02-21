import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';
import Loading from './Loading';

function SelectLanguage (props) {
	var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
	
	return (
		<ul className='languages'>
			{languages.map(function(lang) {
				return (
					<li
						style={lang === props.selectedLanguage ? { color: '#d0021b' } : null}
						onClick={props.onSelect.bind(null, lang)}
						key={lang}>
						{lang}
					</li>
				)
			})}
			</ul>
	)
}

function RepoGrid (props) {
	return (
		<ul className='popular-list'>
			{props.repos.map(function (repo, index) {
				return (
					<li key={repo.name} className='popular-item'>
						<div className='popular-rank'>#{index + 1}</div>
						<ul className='space-list-items'>
							<li>
								<img
									className='avatar'
									src={repo.owner.avatar_url}
									alt={'Avatar for ' + repo.owner.login} />
							</li>
							<li><a href={repo.html_url}>{repo.name}</a></li>
							<li>@{repo.owner.login}</li>
							<li>{repo.stargazers_count} stars</li>
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

SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired,
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