import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import AlbumListScreen from '../AlbumListScreen';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const reducers = {
  albumReducer: {
    isFetching: false,
    success: false,
    error: false,
    data: []
  }
};

const initialStore = mockStore(reducers);

const mockItem = { id: 'mockId' };
const mockNavigation = {
  navigate: jest.fn()
};

describe('AlbumListScreen test suite', () => {
  beforeEach(() => {
    mockNavigation.navigate.mockClear();
  });
  it('Should match snapshot', () => {
    const component = create(
      <AlbumListScreen navigation={mockNavigation} store={initialStore} />
    ).toJSON();
    expect(component).toMatchSnapshot();
  });
  test('FlatLists keyExtractor should return the items id', () => {
    const component = shallow(
      <AlbumListScreen navigation={mockNavigation} store={initialStore} />
    ).dive().dive();
    const flatList = component.find('FlatList').first();
    const extracted = flatList.props().keyExtractor(mockItem);
    expect(extracted).toBe(mockItem.id);
  });
  test('AlbumCoverCard onPress should call navigate', () => {
    const component = shallow(
      <AlbumListScreen navigation={mockNavigation} store={initialStore} />
    ).dive().dive();
    const flatList = component.find('FlatList').first();
    const virtualizedList = flatList.dive().find('VirtualizedList').first();
    const cellRenderer = virtualizedList.dive().find('CellRenderer').first();
    const albumCoverCard = cellRenderer.dive().find('AlbumCoverCard').first();
    albumCoverCard.props().onPress();
    expect(mockNavigation.navigate).toHaveBeenCalled();
  });
});
