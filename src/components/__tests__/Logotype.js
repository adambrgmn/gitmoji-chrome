import React from 'react';
import { render } from '../../../test/utils';
import Logotype from '../Logotype';

it('should render a svg logotype', () => {
  const { getByText } = render(<Logotype />);
  expect(getByText(/gitmoji/i)).toBeInTheDocument();
});
