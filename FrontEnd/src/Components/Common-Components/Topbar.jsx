import React from 'react';
import "./Styles/Topbarstyle.css";
import SearchBar from './Searchbar';
import Profile from './Profile';

export default function Topbar() {
  const handleSearch = (searchTerm) => {
    // Handle search functionality
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="topbar">
      <div className="appname">
        TASKHIVE
      </div>
      
      <div className="topbar-items">
        {/* <div className="search-container">
          <SearchBar onSearch={handleSearch} />
        </div> */}
        
        <div className="profile-section">
          <Profile />
        </div>
      </div>
    </div>
  );
}
