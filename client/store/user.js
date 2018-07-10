import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const SET_ERROR = 'SET_ERROR';
const SET_SUCCESS = 'SET_SUCCESS';
const CLEAR_ERROR = 'CLEAR_ERROR';
const CLEAR_SUCCESS = 'CLEAR_SUCCESS';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
export const setError = errorMessage => ({ type: SET_ERROR, errorMessage });
export const setSuccess = successMessage => ({ type: SET_SUCCESS, successMessage });
export const clearError = () => ({ type: CLEAR_ERROR });
export const clearSuccess = () => ({ type: CLEAR_SUCCESS });

/**
 * THUNK CREATORS
 */
export const me = () => dispatch =>
  axios
    .get('/auth/me')
    .then(res => dispatch(getUser(res.data || defaultUser)))
    .catch(err => console.log(err));

export const auth = (email, password, method, terms) => (dispatch) => {
  const r = new RegExp(/^[a-z0-9](.?[a-z0-9_-]){0,}@[a-z0-9-]+.([a-z]{1,6}.)?[a-z]{2,6}$/g);
  if (!r.exec(email)) {
    return dispatch(setError('The email you provided email does not look valid.'));
  }
  if (!method) return dispatch(setError('need a method'));
  if (!email || email.length <= 8) {
    return dispatch(setError('The email address needs to be atleast 8 charecters long.'));
  }
  if (!password || password.length <= 2) {
    return dispatch(setError('Provided password needs to be longer.'));
  }
  if (method === 'signup' && !terms) {
    return dispatch(setError('You can not register unless you have read and accepted all of our terms.'));
  }
  axios
    .post(`/auth/${method}`, { email, password })
    .then(
      (res) => {
        switch (method) {
          case 'signup': {
            dispatch(setSuccess(`You have successfully signed up. We emailed you a link that needs to clicked to activate your account. Noted that our emails are sometimes placed in your spam folder. Check your email: ${
              res.data.email
            } `));
            break;
          }
          case 'login': {
            if (res.data === 'Need to activate account.') {
              dispatch(setError('You have not activated your account yet.'));
            } else {
              dispatch(getUser(res.data));
              history.push('/account');
            }
            break;
          }
          default: {
            dispatch(setError('Auth Form Error - Unknown Method'));
          }
        }
      },
      (authError) => {
        console.log('auth error:', authError);
        dispatch(setError(authError.response.data));
      },
    )
    .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr));
};

export const logout = () => dispatch =>
  axios
    .post('/auth/logout')
    .then((_) => {
      dispatch(removeUser());
      history.push('/');
    })
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case SET_ERROR: {
      const newUserObj = { ...state };
      newUserObj.error = {
        response: {
          data: action.errorMessage,
        },
      };
      return newUserObj;
    }
    case SET_SUCCESS: {
      const newUserObj = { ...state };
      newUserObj.success = {
        response: {
          data: action.successMessage,
        },
      };
      return newUserObj;
    }
    case CLEAR_ERROR: {
      const newUserObj = { ...state };
      delete newUserObj.error;
      return newUserObj;
    }
    case CLEAR_SUCCESS: {
      const newUserObj = { ...state };
      delete newUserObj.success;
      return newUserObj;
    }
    default:
      return state;
  }
}
