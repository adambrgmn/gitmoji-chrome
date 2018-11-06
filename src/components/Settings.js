import React from 'react';
import styled from 'styled-components';
import { modularScale } from 'polished';
import Statistics from './Statistics';
import ClearData from './ClearData';

const Container = styled.div`
  width: 100%;
  padding: ${modularScale(0)};
`;

const Section = styled.div`
  margin-bottom: ${modularScale(5)};

  &:last-child {
    margin-bottom: 0;
  }
`;

function Settings() {
  return (
    <Container>
      <Section>
        <Statistics />
      </Section>
      <Section>
        <ClearData />
      </Section>
    </Container>
  );
}

export { Settings as default };
