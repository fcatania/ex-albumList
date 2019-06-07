import albumReducer from '../albumReducer';
import { ALBUM_LIST_FETCH, ALBUM_LIST_SUCCESS, ALBUM_LIST_FAILURE } from '../../constants/actionTypes';

const initialState = {
  isFetching: false,
  success: false,
  error: false,
  data: []
};

describe('albumReducer test suite', () => {
  it('[DEFAULT_CASE] Should return initial state', () => {
    const expected = initialState;
    expect(albumReducer(undefined, { type: 'NO_TYPE' })).toEqual(expected);
  });
  it('[ALBUM_LIST_FETCH] Should turn on isFetching flag', () => {
    const expected = { ...initialState, isFetching: true };
    expect(albumReducer(undefined, { type: ALBUM_LIST_FETCH })).toEqual(expected);
  });
  it('[ALBUM_LIST_SUCCESS] Should turn on success flag', () => {
    const expected = { ...initialState, success: true, data: 'data' };
    expect(albumReducer(undefined, { type: ALBUM_LIST_SUCCESS, payload: 'data' })).toEqual(expected);
  });
  it('[ALBUM_LIST_FAILURE] Should turn on error flag', () => {
    const expected = { ...initialState, error: true };
    expect(albumReducer(undefined, { type: ALBUM_LIST_FAILURE })).toEqual(expected);
  });
});
