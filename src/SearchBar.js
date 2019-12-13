import React from 'react';

const SearchBar = props => (
  <form className="form-inline search-box">
    <input className="form-control"
      type="text"
      placeholder="APP OR STUDENT"
      aria-label="Search"
      value={props.searchVal}
      onChange={props.handleChange}
    />
  </form>
)

export default SearchBar