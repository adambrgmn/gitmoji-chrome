import React from 'react';
import Logotype from '../Logotype';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  padding: var(--scale-1);
  background-color: var(--color-yellow);
`;

function Header() {
  return (
    <HeaderContainer>
      <Logotype />
    </HeaderContainer>
  );
}

export { Header as default };
