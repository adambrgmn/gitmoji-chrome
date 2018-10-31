import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { modularScale } from 'polished';

const SearchContainer = styled.div`
  width: 100%;
  height: auto;
  padding: ${modularScale(0)};
  padding-top: 0;
  background-color: ${p => p.theme.color.yellow};
`;

const Input = styled.input.attrs({
  type: 'search',
  placeholder: 'Search...',
})`
  width: 100%;
  border: none;
  border-bottom: 1px solid ${p => p.theme.color.black};
  padding: ${modularScale(-2)} ${modularScale(-1)};
  font-size: ${modularScale(0)};
  font-family: ${p => p.theme.font.body};
  line-height: 1;
  background-color: transparent;

  &::placeholder {
    color: ${p => p.theme.color.black};
    opacity: 0.5;
  }

  &:focus {
    outline: none;
  }
`;

function SearchInput({ value, onChange }) {
  const handleChange = e => {
    const { value: newValue } = e.target;
    onChange(newValue);
  };

  return (
    <SearchContainer>
      <Input value={value} onChange={handleChange} />
    </SearchContainer>
  );
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export { SearchInput as default };
