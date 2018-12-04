import * as types from '../constants/actionTypes';
export function getBooks() {
  const api = types.API_URL_BOOKS;
  return dispatch => {
    return dispatch({
      type: types.ACTION_BOOK_LIST,
      promise: client => client.get(api).then((data) => {
        return data;
      }),
    });
  };
}

export function getBook(id) {
  const api = types.API_URL_BOOKS + '/'+id;
  return dispatch => {
    return dispatch({
      type: types.ACTION_BOOK_VIEW,
      promise: client => client.get(api).then((data) => {
        return data;
      }),
    });
  };
}

export function createBook(obj) {
  const api = types.API_URL_BOOKS;
  return dispatch => {
    return dispatch({
      type: types.ACTION_BOOK_CREATE,
      promise: client => client.post(api, obj).then((data) => {
        dispatch({
          type: 'SHOW_ALERT_MESSAGE',
          alertMessage: {
            message: 'Book created successfully',
            variant: 'success',
          }
        });
        return data;
      }),
    });
  };
}