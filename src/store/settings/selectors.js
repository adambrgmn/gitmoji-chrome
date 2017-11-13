import { createSelector } from 'reselect';

const settingsVisibleSelector = createSelector(
  state => state.settings,
  settings => settings.show,
);

export { settingsVisibleSelector };
