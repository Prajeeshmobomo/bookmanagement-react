import * as types from '../constants/actionTypes';
import helpers from '../../utils/helpers';
export default function reducer(state = {}, action = {}) {
  switch (action.type) {

    case helpers.actionTypeSuccess(types.ACTION_BOOK_LIST):
      let books = action.result && action.result.data ? action.result.data : [];
      return {
        ...state,
        books
      };

    case helpers.actionTypeSuccess(types.ACTION_BOOK_CREATE):
    case helpers.actionTypeSuccess(types.ACTION_BOOK_VIEW):
      return {
        ...state,
        bookInfo : action.result.data
      };

    case helpers.actionTypeFailed(types.ACTION_BOOK_CREATE):
      return {
        ...state,
        ...action.errorHandler
      };  


    default:
      return state;
  }
}

