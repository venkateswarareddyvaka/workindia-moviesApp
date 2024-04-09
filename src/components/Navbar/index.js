import React, { useState } from 'react';
import SearchResult from '../SearchResults';
import { Link } from 'react-router-dom';
import './index.css'; 

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = () => {
    
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=60d7c74b69bb1f98d72e9bf5f46c9a6d&language=en-US&query=${searchQuery}&page=1`)
      .then(response => response.json())
      .then(data => {
        setSearchResult(data);
      })
      .catch(error => {
        console.error('Error searching:', error);
      });
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <nav>
      <div className="navbar-container">
        <h1>MovieDB</h1>
        <div className='inside'>
            <ul className="navbar-links">
                <li><Link to="/" className='link'>Popular</Link></li>
                <li><Link to="/toprated" className='link'>Top Rated</Link></li>
                <li><Link to="/upcomingmovie" className='link'>Upcoming</Link></li>
            </ul>
            <div className="search-bar">
                <input type="text" placeholder="Search..." value={searchQuery} onChange={handleInputChange} />
                <button onClick={handleSearch}>Search</button>
            </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
