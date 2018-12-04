import * as types from '../constants/actionTypes';
//import localStore from '../../utils/localStore';
import helpers from '../../utils/helpers';


export function checkAuthentication(obj) {
  const api = types.API_URL_LOGIN;
  return dispatch => {
    return dispatch({
      type: types.ACTION_AUTH,
      promise: client => client.post(api, obj).then((data) => {
        dispatch({
          type: 'SHOW_ALERT_MESSAGE',
          alertMessage: {
            message: data.data.message,
            variant: 'success',
          }
        });
        return data;
      }),
    });
  };
}

export function checkAlreadyLoggedIn() {
  let actionType = helpers[`actionType${localStorage.getItem('loginToken') ? 'Success' : 'Failed'}`](types.ACTION_AUTH);
  return dispatch => {
    return dispatch({
      type: actionType
    });
  }
}

// export function deleteAuthenticationToken() {
//   return dispatch => {
//     return dispatch({
//       type: 'SHOW_ALERT_MESSAGE',
//       alertMessage: {
//         message: 'Logged out Successfully',
//         variant: 'success',
//       }
//     });
//   }
// }

export function deleteAuthenticationToken() {
  const api = types.API_URL_LOGOUT;
  return dispatch => {
    return dispatch({
      type: types.ACTION_LOGOUT,
      promise: client => client.post(api).then((data) => {
        dispatch({
          type: 'SHOW_ALERT_MESSAGE',
          alertMessage: {
            message: data.data.message,
            variant: 'success',
          }
        });
        return data;
      }),
    });
  };
}