import {
  ALBUM_LIST_FETCH,
  ALBUM_LIST_SUCCESS,
  ALBUM_LIST_FAILURE,
  PHOTO_DETAIL_FETCH,
  PHOTO_DETAIL_SUCCESS,
  PHOTO_DETAIL_FAILURE
} from '../constants/actionTypes';

const fetchAlbumList = () => (dispatch) => {
  dispatch({ type: ALBUM_LIST_FETCH });
  fetch('http://my-json-server.typicode.com/fcatania/ex-albumList/albums')
    .then(response => response.json())
    .then((json) => { dispatch({ type: ALBUM_LIST_SUCCESS, payload: json }); })
    .catch(() => { dispatch({ type: ALBUM_LIST_FAILURE }); });
};

const fetchPhotoDetail = photoId => (dispatch) => {
  dispatch({ type: PHOTO_DETAIL_FETCH });
  fetch(`http://my-json-server.typicode.com/fcatania/ex-albumList/photos/${photoId}`)
    .then(response => response.json())
    .then((json) => { dispatch({ type: PHOTO_DETAIL_SUCCESS, payload: json }); })
    .catch(() => { dispatch({ type: PHOTO_DETAIL_FAILURE }); });
};

export { fetchAlbumList, fetchPhotoDetail };
