import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';

import AlbumListScreen from '../AlbumListScreen';

const mockItem = { id: 'mockId' };

describe('AlbumListScreen test suite', () => {
  it('Should match snapshot', () => {
    const component = create(<AlbumListScreen />).toJSON();
    expect(component).toMatchSnapshot();
  });
  test('FlatLists keyExtractor should return the items id', () => {
    const component = shallow(<AlbumListScreen />);
    const flatList = component.find('FlatList').first();
    const extracted = flatList.props().keyExtractor(mockItem);
    expect(extracted).toBe(mockItem.id);
  });
  test('AlbumCoverCard onPress placeholder test', () => {
    const component = shallow(<AlbumListScreen />);
    const flatList = component.find('FlatList').first();
    const virtualizedList = flatList.dive().find('VirtualizedList').first();
    const cellRenderer = virtualizedList.dive().find('CellRenderer').first();
    const albumCoverCard = cellRenderer.dive().find('AlbumCoverCard').first();
    // once the onPress is correctly handled, this test will change
    const result = albumCoverCard.props().onPress();
    expect(result).toBe(undefined);
  });
});
