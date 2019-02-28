import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
      <div className='home-container'>
        <h1>Github Battle: Go HEAD to HEAD!</h1>
        <Link className='button' to='/battle'>
          Time to Battle!
        </Link>
      </div>
  )
}

export default Home;