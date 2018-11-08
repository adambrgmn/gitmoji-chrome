import styled from 'styled-components';
import { hideVisually } from 'polished';

const SettingsButton = styled.button`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  border: none;
  padding: 0.5rem;
  margin: 0;
  background-color: transparent;
  z-index: ${p => p.theme.zIndex.two};

  &:focus {
    outline: none;
  }
`;

const HiddenLabel = styled.span`
  ${hideVisually()};
`;

export { SettingsButton as default, HiddenLabel };
