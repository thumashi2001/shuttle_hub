

import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      {/* Button to Show/Hide Search */}
      <button 
        onClick={() => setShowSearch(!showSearch)} 
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-3"
      >
        {showSearch ? "Close Search" : "Open Search"}
      </button>

      {/* Search Bar */}
      {showSearch && (
        <div className='border-t border-b bg-gray-50 text-center p-2'>
          <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-2 mx-3 rounded-full w-3/4 sm:w-1/2'>
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                onSearch(e.target.value); // Pass search text to List.jsx
              }}
              className='flex-1 outline-none bg-inherit text-sm'
              type='text'
              placeholder='Search Products...'
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
