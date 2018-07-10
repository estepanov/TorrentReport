import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'; // eslint-disable-line
import config from './config';
import user from './user';
import stats from './stats';
import listings from './listings';
import infos from './infos';
import groups from './groups';
import sites from './sites';
import topFilter from './topFilter';
import test from './test';

const reducer = combineReducers({
  config,
  user,
  test,
  stats,
  listings,
  infos,
  groups,
  sites,
  topFilter,
});
// eslint-disable-next-line
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true })));
const store = createStore(reducer, middleware);

export default store;
export * from './config';
export * from './user';
export * from './stats';
export * from './listings';
export * from './infos';
export * from './groups';
export * from './sites';
export * from './topFilter';
export * from './test';
