import emojis from '../../../test/data/emojis.json';

const random = () => Math.floor(Math.random * 10);

const getStatistics = jest.fn(() =>
  Promise.resolve(
    emojis.map(({ code, emoji, color }) => ({
      code,
      emoji,
      color,
      count: random(),
    })),
  ),
);

const addToStatistics = jest.fn(() => Promise.resolve());

const subscribeToStatistics = jest.fn();

export { getStatistics, addToStatistics, subscribeToStatistics };
