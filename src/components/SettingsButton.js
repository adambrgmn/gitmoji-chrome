import styled from 'styled-components';

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

export { SettingsButton as default };
