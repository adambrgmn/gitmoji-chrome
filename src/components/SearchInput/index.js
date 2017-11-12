import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { modularScale } from 'polished';
import { color, font } from '../../style/theme';

const SearchContainer = styled.div`
  width: 100%;
  height: auto;
  padding: ${modularScale(0)};
  padding-top: 0;
  background-color: ${color.yellow};
`;

const Input = styled.input.attrs({
  type: 'text',
  placeholder: 'Search...',
})`
  width: 100%;
  border: none;
  border-bottom: 1px solid ${color.black};
  padding: ${modularScale(-2)} ${modularScale(-1)};
  font-size: ${modularScale(0)};
  font-family: ${font.body};
  line-height: 1;
  background-color: transparent;

  &:placeholder {
    color: ${color.black};
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
