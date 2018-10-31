import 'isomorphic-fetch';
import dotenv from 'dotenv';
import { fetchEmojis } from '../api';

it('should fetch emojis from the gitmoji github repository', async () => {
  dotenv.config();
  const emojis = await fetchEmojis();

  expect(emojis).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        emoji: expect.any(String),
        code: expect.any(String),
        color: expect.any(String),
        description: expect.any(String),
        filterKey: expect.any(String),
      }),
    ]),
  );
});
