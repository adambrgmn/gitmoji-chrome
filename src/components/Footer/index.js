import React from 'react';
import Link from '../Link';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  padding: var(--scale-1);
  font-size: var(--scale--1);
`;

const FooterCredit = styled.p`
  margin: 0;
  text-align: center;
`;

const FooterLink = styled(Link)`
  color: var(--color-pink);
  text-decoration: none;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterCredit>
        Send all love to{' '}
        <FooterLink href="https://github.com/carloscuesta/gitmoji/">
          carloscuesta/gitmoji
        </FooterLink>
      </FooterCredit>
    </FooterContainer>
  );
}

export { Footer as default };
