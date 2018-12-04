export let API_BASE_URL = process.env.NODE_ENV === 'production' ? 'http://10.2.0.110:3000/api' : 'http://10.2.0.110:3000/api';
export let API_VERSION =  'v1';

export let API_URL = `${API_BASE_URL}/${API_VERSION}/`;


export const API_URL_LOGIN = `${API_URL}authenticate`;
export const API_URL_LOGOUT = `${API_URL}logout`;

export const API_URL_BOOKS = `${API_URL}books`;




















export const ACTION_BOOK_LIST = 'BOOK_LIST';
export const ACTION_BOOK_CREATE = 'BOOK_CREATE';
export const ACTION_BOOK_VIEW = 'BOOK_VIEW';
export const ACTION_AUTH = 'AUTHENTICATION';
export const ACTION_LOGOUT = 'LOGOUT';
