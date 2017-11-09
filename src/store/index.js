import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import emojis from './emojis';
import recent from './recent';
import messages from './messages';

const initStore = () => {
  const reducer = combineReducers({ emojis, recent, messages });
  const middleware = [thunk];

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middleware)),
  );

  return store;
};

export { initStore as default };
