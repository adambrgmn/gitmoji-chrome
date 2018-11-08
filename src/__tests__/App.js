import React from 'react';
import { render } from 'react-testing-library';
import App from '../App';

jest.mock('../api/emojis');

it('should render without problem', async () => {
  render(<App />);
});
