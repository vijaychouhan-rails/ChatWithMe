import {
  SET_USER,
} from '../constants/types';

export const loginUser = (email, name) => (
  (dispatch) => {
    dispatch({
      type: SET_USER,
      email, name,
    });
    promise = new Promise(function(resolve, reject) {
      resolve(true)
    });
    return promise
  }
);
