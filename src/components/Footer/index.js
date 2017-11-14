import React from 'react';
import Link from '../Link';
import styled from 'styled-components';
import { modularScale } from 'polished';
import { color } from '../../style/theme';

const FooterContainer = styled.footer`
  width: 100%;
  padding: ${modularScale(1)};
  padding-bottom: ${modularScale(4)};
  font-size: ${modularScale(-1)};
`;

const FooterCredit = styled.p`
  margin: 0;
  text-align: center;
`;

const FooterLink = styled(Link)`
  color: ${color.pink};
  text-decoration: none;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterCredit>
        Created by{' '}
        <FooterLink href="https://github.com/adambrgmn/gitmoji-chrome/">
          adambrgmn/gitmoji-chrome
        </FooterLink>
      </FooterCredit>
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
