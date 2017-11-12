import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SearchContainer = styled.div`
  width: 100%;
  height: auto;
  padding: var(--scale-0);
  padding-top: 0;
  background-color: var(--color-yellow);
`;

const Input = styled.input.attrs({
  type: 'text',
  placeholder: 'Search...',
})`
  width: 100%;
  border: none;
  border-bottom: 1px solid var(--color-black);
  padding: var(--scale--2) var(--scale--1);
  font-size: var(--scale-0);
  font-family: var(--font-serif);
  line-height: 1;
  background-color: transparent;

  &:placeholder {
    color: var(--color-black);
    opacity: 0.5;
  }

  &:focus {
    outline: none;
  }
`;

function SearchInput({ value, onChange }) {
  return (
    <SearchContainer>
      <Input value={value} onChange={onChange} />
    </SearchContainer>
  );
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export { SearchInput as default };
