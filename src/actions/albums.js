import {
  ALBUM_LIST_FETCH,
  ALBUM_LIST_SUCCESS,
  ALBUM_LIST_FAILURE,
  PHOTO_DETAIL_FETCH,
  PHOTO_DETAIL_SUCCESS,
  PHOTO_DETAIL_FAILURE
} from '../constants/actionTypes';
import { STORAGE_ALBUMS_KEY, STORAGE_PHOTO_DETAIL_PREFIX } from '../constants/constants';
import { setItem, getItem } from '../utils/asyncStorage';

const fetchAlbumList = () => (dispatch) => {
  fetch('http://my-json-server.typicode.com/fcatania/ex-albumList/albums')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('request failed');
    })
    .then((json) => {
      dispatch({ type: ALBUM_LIST_SUCCESS, payload: json });
      setItem(STORAGE_ALBUMS_KEY, json);
    })
    .catch(() => { dispatch({ type: ALBUM_LIST_FAILURE }); });
};

const fetchPhotoDetail = photoId => (dispatch) => {
  fetch(`http://my-json-server.typicode.com/fcatania/ex-albumList/photos/${photoId}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('request failed');
    })
    .then((json) => {
      dispatch({ type: PHOTO_DETAIL_SUCCESS, payload: json });
      setItem(`${STORAGE_PHOTO_DETAIL_PREFIX}${photoId}`, json);
    })
    .catch(() => { dispatch({ type: PHOTO_DETAIL_FAILURE }); });
};

const getAlbumList = () => async (dispatch) => {
  dispatch({ type: ALBUM_LIST_FETCH });
  const localList = await getItem(STORAGE_ALBUMS_KEY);
  if (localList) {
    dispatch({ type: ALBUM_LIST_SUCCESS, payload: JSON.parse(localList) });
  } else {
    dispatch(fetchAlbumList());
  }
};

const getPhotoDetail = photoId => async (dispatch) => {
  dispatch({ type: PHOTO_DETAIL_FETCH });
  const localPhotoDetail = await getItem(`${STORAGE_PHOTO_DETAIL_PREFIX}${photoId}`);
  if (localPhotoDetail) {
    dispatch({ type: PHOTO_DETAIL_SUCCESS, payload: JSON.parse(localPhotoDetail) });
  } else {
    dispatch(fetchPhotoDetail(photoId));
  }
};

export { getAlbumList, getPhotoDetail };
