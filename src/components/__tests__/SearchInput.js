import React from 'react';
import { fireEvent } from 'react-testing-library';
import SearchInput from '../SearchInput';
import { render } from '../../../test/utils';

it('should render an input', () => {
  const handleChange = jest.fn();

  const { getByPlaceholderText } = render(
    <SearchInput value="" onChange={handleChange} />,
  );

  fireEvent.change(getByPlaceholderText(/search/i), {
    target: { value: 'Foo' },
  });

  expect(handleChange).toHaveBeenCalledWith('Foo');
});
