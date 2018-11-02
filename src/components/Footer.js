import React, { memo } from 'react';
import styled from 'styled-components';
import { modularScale } from 'polished';
import Link from './Link';

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
  color: ${p => p.theme.color.pink};
  text-decoration: none;
`;

const Footer = memo(() => (
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
));

export { Footer as default };
