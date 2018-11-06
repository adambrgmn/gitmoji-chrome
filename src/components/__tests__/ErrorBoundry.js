/* eslint-disable no-console */
import React from 'react';
import { render, waitForElement } from 'react-testing-library';
import ErrorBoundry from '../ErrorBoundry';
import ErrorComp from '../ErrorComp';
import { disableConsole } from '../../../test/utils';

const ThrowingComp = ({ message }) => {
  throw new Error(message);
};

disableConsole('error');

it('should render a boundry to handle errors', async () => {
  const msg = 'Could not render';

  const { getByText } = render(
    <ErrorBoundry renderError={props => <ErrorComp {...props} />}>
      <ThrowingComp message={msg} />
    </ErrorBoundry>,
  );

  await waitForElement(() => getByText(msg));
  expect(getByText(msg)).toBeInTheDocument();
});
