import { ALBUM_LIST_FETCH, ALBUM_LIST_SUCCESS, ALBUM_LIST_FAILURE } from '../constants/actionTypes';

const INITIAL_STATE = {
  isFetching: false,
  success: false,
  error: false,
  data: []
};

const albumReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ALBUM_LIST_FETCH:
      return { ...state, isFetching: true, success: false, error: false };
    case ALBUM_LIST_SUCCESS:
      return { ...state, isFetching: false, success: true, error: false, data: action.payload };
    case ALBUM_LIST_FAILURE:
      return { ...state, isFetching: false, success: false, error: true };
    default:
      return state;
  }
};

export default albumReducer;
