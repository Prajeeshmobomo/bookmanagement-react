import helpers from '../../utils/helpers';
import localStore from '../../utils/localStore';
import * as types from '../constants/actionTypes';


export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case types.ACTION_AUTH:
      return {
        ...state,
        validator: {},
        message: ''
      };
      
    case helpers.actionTypeSuccess(types.ACTION_AUTH):
      return {
        ...state,
        authToken: localStore.getData('loginToken')
      };

    case helpers.actionTypeFailed(types.ACTION_AUTH):
      return {
        ...state,
        authToken: '',
        message: 'Invalid Credentials',
        ...action.errorHandler
      };

    case helpers.actionTypeSuccess(types.ACTION_LOGOUT):
      localStore.removeAll();
      return {
        ...state,
        authToken: ''
      };

    case helpers.actionTypeFailed(types.ACTION_LOGOUT):
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
}

