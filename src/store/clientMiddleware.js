import axios from 'axios';
import localStore from  '../utils/localStore';
import * as types from '../redux/constants/actionTypes';
// axios.defaults.headers.common['x-client-access-token']  = 'xxxxxxxxxx';
// axios.defaults.headers.common['Content-Type']  = 'application/json';

axios.defaults.transformRequest.splice(0, -1, function(data, header) {
  let accessToken =  localStore.getData('loginToken');
  if(accessToken) {
    header['Authorization'] =  accessToken;
  }
  return data;
});

let apiCounter = 0;
function apiMiddlewareCreator(client) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, client);
    }

    const { promise, type, hideLoader, ...rest } = action;
    const apiId = apiCounter++;

    if (!promise) {
      return next(action);
    }

    !hideLoader && next({ ...rest, type: 'START_LOADING', id: apiId });
    next({ ...rest, type: `${type}` });

    const actionPromise = promise(client);

    actionPromise
      .then(result => {
        if(result.data.success === false) throw result.data.message;
        if (result && result.data && result.data) {
          switch(action.type) {
            case types.ACTION_AUTH:
              result.data.auth_token && localStore.setData("loginToken", result.data.auth_token || '');
              break;
            default:
                //nothing
          }
        }
        !hideLoader && next({ ...rest, type: 'STOP_LOADING', id: apiId });
        return next({ ...rest, result, type: `${type}_SUCCESS`, originalType: type })
      })
      .catch(error => {
        let validator = {}, message = "";
        let formErrors = error.response.data;
        if(typeof(formErrors) == 'object') {
          Object.keys(formErrors).forEach(function (k) {
            validator[k] = formErrors[k]
          });
        }
        // if(!error.response) {
        //   next({
        //     type: 'SHOW_ALERT_MESSAGE',
        //     alertMessage: {
        //       message: 'Something went wrong. Please contact administrator or try again after sometime.',
        //       variant: 'danger',
        //     }
        //   });
        // }
        const errorHandler = {
          validator: validator,
          alertMessage: {
            message: message,
            variant: 'danger',
          },
          ...error,
        };
        next({ ...rest, type: 'STOP_LOADING', id: apiId });
        return next({ ...rest, error, errorHandler, type: `${type}_FAILED`, originalType: type });
      });

    return actionPromise;
  };
}

const apiMiddleware = apiMiddlewareCreator(axios);

export default apiMiddleware;
