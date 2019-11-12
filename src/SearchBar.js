import React from 'react';

const SearchBar = props => (
  <form className="form-inline">
    <input className="form-control"
      type="text"
      placeholder="Search..."
      aria-label="Search"
      value={props.searchVal}
      onChange={props.handleChange}
    />
  </form>
)

export default SearchBar