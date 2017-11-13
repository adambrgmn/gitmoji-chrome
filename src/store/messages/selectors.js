import uniqWith from 'lodash/uniqWith';
import isEqual from 'lodash/isEqual';
import { createSelector } from 'reselect';

const messagesSelector = createSelector(
  state => state.messages,
  messages => uniqWith(messages, isEqual),
);

export { messagesSelector };
