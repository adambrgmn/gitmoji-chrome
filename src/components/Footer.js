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

const Footer = memo(() => (
  <FooterContainer>
    <FooterCredit>
      Created by{' '}
      <Link href="https://github.com/adambrgmn/gitmoji-chrome/">
        adambrgmn/gitmoji-chrome
      </Link>
    </FooterCredit>
    <FooterCredit>
      Send all love to{' '}
      <Link href="https://github.com/carloscuesta/gitmoji/">
        carloscuesta/gitmoji
      </Link>
    </FooterCredit>
  </FooterContainer>
));

export { Footer as default };
