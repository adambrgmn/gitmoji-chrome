import 'isomorphic-fetch';
import dotenv from 'dotenv';
import { getEmojis } from '../api/emojis';

it('should fetch emojis from the gitmoji github repository', async () => {
  dotenv.config();
  const emojis = await getEmojis();

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
