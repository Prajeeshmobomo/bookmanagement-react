import { combineReducers } from 'redux';
//import { routerReducer as routing } from 'react-router-redux';

import bookReducer from './bookReducer';
import alertReducer from './alertReducer';
import authReducer from './authReducer';

const appReducer = combineReducers({
  // routing,
  alertReducer,
  books: bookReducer,
  authentication: authReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action)
};

export default rootReducer;
