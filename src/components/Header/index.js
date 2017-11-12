import React from 'react';
import Logotype from '../Logotype';
import styled from 'styled-components';
import { modularScale } from 'polished';
import { color } from '../../style/theme';

const HeaderContainer = styled.header`
  padding: ${modularScale(1)};
  background-color: ${color.yellow};
`;

function Header() {
  return (
    <HeaderContainer>
      <Logotype />
    </HeaderContainer>
  );
}

export { Header as default };
