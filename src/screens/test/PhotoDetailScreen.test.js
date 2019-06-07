import React from 'react';
import { create } from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import PhotoDetailScreen from '../PhotoDetailScreen';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const mockPhotoDetail = {
  id: 'mockId',
  fullUrl: 'mockUrl'
};

const mockReducers = {
  albumReducer: {
    photoDetail: {
      isFetching: true,
      success: false,
      error: false,
      data: {}
    }
  }
};

const fetchingStore = mockStore(mockReducers);
const successStore = mockStore({
  albumReducer: {
    photoDetail: {
      ...mockReducers.albumReducer.photoDetail,
      isFetching: false,
      success: true,
      data: mockPhotoDetail
    }
  }
});
const errorStore = mockStore({
  albumReducer: {
    photoDetail: {
      ...mockReducers.albumReducer.photoDetail,
      error: true
    }
  }
});

const mockNavigation = {
  getParam: jest.fn()
};

describe('PhotoDetailScreen test suite', () => {
  beforeEach(() => {
    mockNavigation.getParam.mockClear();
  });
  it('Should match snapshot (isFetching case)', () => {
    const component = create(
      <PhotoDetailScreen navigation={mockNavigation} store={fetchingStore} />
    ).toJSON();
    expect(component).toMatchSnapshot();
  });
  it('Should match snapshot (success case)', () => {
    const component = create(
      <PhotoDetailScreen navigation={mockNavigation} store={successStore} />
    ).toJSON();
    expect(component).toMatchSnapshot();
  });
  it('Should match snapshot (error case)', () => {
    const component = create(
      <PhotoDetailScreen navigation={mockNavigation} store={errorStore} />
    ).toJSON();
    expect(component).toMatchSnapshot();
  });
});
