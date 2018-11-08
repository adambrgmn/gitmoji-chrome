import React, { Fragment, memo } from 'react';
import styled from 'styled-components';
import { modularScale, darken } from 'polished';
import SettingsSectionTitle from './SettingsSectionTitle';
import { boxShadow, transition } from '../style/utils';
import { clear } from '../chrome/storage';

const ClearButton = styled.button`
  display: block;
  width: 100%;
  height: ${modularScale(5)};
  border: none;
  border-radius: 4px;
  background-color: ${p => p.theme.color.orange};

  &:hover {
    background-color: ${p => darken(0.1, p.theme.color.orange)};
    transform: translateY(-3px);
  }

  &:focus {
    outline: none;
    background-color: ${p => darken(0.2, p.theme.color.orange)};
  }

  ${boxShadow(true)};

  ${transition('box-shadow', 'transform', 'background')};
`;

const ClearData = memo(() => (
  <Fragment>
    <SettingsSectionTitle>Clear all data</SettingsSectionTitle>
    <ClearButton type="button" onClick={() => clear()}>
      Clear all
    </ClearButton>
  </Fragment>
));

export { ClearData as default };
