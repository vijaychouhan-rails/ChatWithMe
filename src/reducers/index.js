import { combineReducers } from 'redux-immutable';
import userAuth from './userAuth';

const rootReducer = combineReducers({
  userAuth,
});

export default rootReducer;
