import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Button from '../Button';

it('should render a button', () => {
  const onClick = jest.fn();
  const { getByText } = render(<Button onClick={onClick}>Click</Button>);
  const btn = getByText(/click/i);

  fireEvent.click(btn);
  expect(onClick).toHaveBeenCalled();
});
