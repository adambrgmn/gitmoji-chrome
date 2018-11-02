import React, { memo } from 'react';
import styled from 'styled-components';
import { modularScale } from 'polished';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${modularScale(2)};
`;

const Loader = memo(() => (
  <Container>
    <span role="img" aria-label="Loading content">
      😴
    </span>
  </Container>
));

export { Loader as default };
