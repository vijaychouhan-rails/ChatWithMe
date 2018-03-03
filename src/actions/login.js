import {
  SET_USER,
} from '../constants/types';

import Backend from '../../Backend';

export const loginUser = (email, password) => (
  (dispatch) => {
    return(
      Backend.getFireBase().auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch({
          type: SET_USER,
          email: user.email,
          uid: user.uid,
        });
        return {success: true};
      })
      .catch((error) => {
        const { code, message } = error;
        return {success: false, error: message};
      })
    )
  }
);

export const signUpUser = (email, password) => (
  (dispatch) => {
    return(
      Backend.getFireBase().auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch({
          type: SET_USER,
          email: user.email,
          uid: user.uid,
        });
        return {success: true};
      })
      .catch((error) => {
        const { code, message } = error;
        return {success: false, error: message};
      })
    )
  }
);
