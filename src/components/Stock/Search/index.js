import React, { useState } from 'react'
import './styles.css'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function Search({search, onSearchChange}) {

  return (
    <div className='search-flex'>
      <SearchRoundedIcon/>
      <input 
        placeholder='Search'
        type='text'
        value={search}
        onChange={(e) => onSearchChange(e)}
      />
      <input/>
    </div>
  )
}

export default Search