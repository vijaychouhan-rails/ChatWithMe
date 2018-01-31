import Immutable from 'immutable';
import * as types from '../constants/types';

const initialState = Immutable.fromJS(
  {name: '', email: ''},
);

const userAuth = (state = initialState, action) => {
  switch (action.type) {
  case types.SET_USER:
    return state.merge({ name: action.name, email: action.email });
  default:
    return state;
  }
};

export default userAuth;
