import React from 'react';
import styled from 'styled-components';
import { modularScale } from 'polished';
import About from './About';
import Statistics from './Statistics';
import ClearData from './ClearData';
import ErrorBoundry from './ErrorBoundry';
import ErrorComp from './ErrorComp';

const Container = styled.div`
  width: 100%;
  padding: ${modularScale(0)};
`;

const Section = styled.div`
  margin-bottom: ${modularScale(2.5)};
  border-bottom: 1px solid ${p => p.theme.black};
  padding-bottom: ${modularScale(2.5)};

  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
    padding-bottom: 0;
  }
`;

function Settings() {
  return (
    <Container>
      <Section>
        <About />
      </Section>

      <Section>
        <ErrorBoundry renderError={p => <ErrorComp {...p} />}>
          <Statistics />
        </ErrorBoundry>
      </Section>

      <Section>
        <ClearData />
      </Section>
    </Container>
  );
}

export { Settings as default };
