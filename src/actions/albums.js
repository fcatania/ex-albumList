import { ALBUM_LIST_FETCH, ALBUM_LIST_SUCCESS, ALBUM_LIST_FAILURE } from '../constants/actionTypes';

// mock fetch will be replaced with the correct one once the mock server is ready
const fetchAlbumList = () => (dispatch) => {
  dispatch({ type: ALBUM_LIST_FETCH });
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(e => console.log(e));
};

export default { fetchAlbumList };
