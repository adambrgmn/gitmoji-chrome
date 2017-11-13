import { createSelector } from 'reselect';
import fuzz from 'fuzzaldrin-plus';

const fuzzyFilter = (items, input) => {
  const filtered = fuzz.filter(items, input, { key: 'filterKey' });
  return filtered;
};

const emojisSelector = createSelector(
  [state => state.emojis.items, (_, props) => props.filter],
  (emojis, filter) =>
    filter.length > 0 ? fuzzyFilter(emojis, filter) : emojis,
);

export { emojisSelector };
