import styled, { css } from 'styled-components';
import { modularScale } from 'polished';
import { color } from '../../style/theme';
import { transition } from '../../style/utils';

const SettingsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: ${modularScale(0)};
  padding-top: calc(${modularScale(0)} + 3rem);
  background-color: ${color.bg};
  opacity: 1;
  visibility: visible;
  ${transition('transform', 'opacity', 'visibility')};

  ${props =>
    !props.show &&
    css`
      visibility: hidden;
      opacity: 0;
      transform: translateY(-100%);
    `};
`;

export { SettingsContainer as default };
