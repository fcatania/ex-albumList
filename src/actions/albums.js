import { ALBUM_LIST_FETCH, ALBUM_LIST_SUCCESS, ALBUM_LIST_FAILURE } from '../constants/actionTypes';

const fetchAlbumList = () => (dispatch) => {
  dispatch({ type: ALBUM_LIST_FETCH });
  fetch('http://my-json-server.typicode.com/fcatania/ex-albumList/albums')
    .then(response => response.json())
    .then((json) => { dispatch({ type: ALBUM_LIST_SUCCESS, payload: json }); })
    .catch(() => { dispatch({ type: ALBUM_LIST_FAILURE }); });
};

export { fetchAlbumList }; // eslint-disable-line
