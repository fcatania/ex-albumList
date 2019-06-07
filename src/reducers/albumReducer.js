import {
  ALBUM_LIST_FETCH,
  ALBUM_LIST_SUCCESS,
  ALBUM_LIST_FAILURE,
  PHOTO_DETAIL_FETCH,
  PHOTO_DETAIL_SUCCESS,
  PHOTO_DETAIL_FAILURE
} from '../constants/actionTypes';

const INITIAL_STATE = {
  isFetching: false,
  success: false,
  error: false,
  data: [],
  photoDetail: {
    isFetching: false,
    success: false,
    error: false,
    data: {}
  }
};

const albumReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ALBUM_LIST_FETCH:
      return { ...state, isFetching: true, success: false, error: false };
    case ALBUM_LIST_SUCCESS:
      return { ...state, isFetching: false, success: true, error: false, data: action.payload };
    case ALBUM_LIST_FAILURE:
      return { ...state, isFetching: false, success: false, error: true };
    case PHOTO_DETAIL_FETCH:
      return {
        ...state,
        photoDetail: {
          ...state.photoDetail,
          isFetching: true,
          success: false,
          error: false
        }
      };
    case PHOTO_DETAIL_SUCCESS:
      return {
        ...state,
        photoDetail: {
          ...state.photoDetail,
          isFetching: false,
          success: true,
          error: false,
          data: action.payload
        }
      };
    case PHOTO_DETAIL_FAILURE:
      return {
        ...state,
        photoDetail: {
          ...state.photoDetail,
          isFetching: false,
          success: false,
          error: true
        }
      };
    default:
      return state;
  }
};

export default albumReducer;
