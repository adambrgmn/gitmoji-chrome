import React from 'react';
import PropTypes from 'prop-types';
import './searchinput.css';

function SearchInput({ value, onChange }) {
  return (
    <div className="search-container">
      <input
        className="search-input"
        value={value}
        placeholder="Search..."
        onChange={onChange}
      />
    </div>
  );
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export { SearchInput as default };
