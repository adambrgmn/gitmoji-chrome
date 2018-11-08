import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { modularScale } from 'polished';

const Container = styled.div`
  width: 100%;
  padding: 0 ${modularScale(0)};
  margin-top: ${modularScale(1)};
`;

const ErrorMessage = styled.p`
  font-size: ${modularScale(1)};
  text-align: center;
`;

function ErrorComp({ error }) {
  return (
    <Container>
      <ErrorMessage>
        {error.message}{' '}
        <span role="img" aria-label="frustrated emoji">
          😫
        </span>
      </ErrorMessage>
    </Container>
  );
}

ErrorComp.propTypes = {
  error: PropTypes.shape({ message: PropTypes.string.isRequired }).isRequired,
};

export { ErrorComp as default };
