import { applyMiddleware, compose, createStore } from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import rootReducer from './reducers';

const middlewares = [promise, thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const saveToSessionStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);

    sessionStorage.setItem('state', serializedState);
  }
  catch (e) {
    console.log(e);
  }
};

const loadFromSessionStorage = () => {
  try {
    const serializedState = sessionStorage.getItem('state');

    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  }
  catch (e) {
    console.log(e);

    return undefined;
  }
};

const persistedState = loadFromSessionStorage();

const store = createStore(
  rootReducer,
  persistedState,
  compose(applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f),
);

store.subscribe(() => saveToSessionStorage(store.getState()));

export default store;
