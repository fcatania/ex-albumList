import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';

import PhotoListScreen from '../PhotoListScreen';

import { PHOTO_LIST_SCREEN_DEFAULT_TITLE } from '../../constants/constants';

const mockPhoto = { id: 'mockId', thumbnailUrl: 'mockUrl' };
const mockNavigation = {
  getParam: jest.fn(() => ({
    title: 'mockTitle',
    photos: [mockPhoto]
  }))
};

describe('PhotoListScreen test suite', () => {
  beforeEach(() => {
    mockNavigation.getParam.mockClear();
  });
  it('Should match snapshot', () => {
    const component = create(<PhotoListScreen navigation={mockNavigation} />).toJSON();
    expect(component).toMatchSnapshot();
  });
  it('Should return the correct object when navigationOptions is called', () => {
    const result = PhotoListScreen.navigationOptions({ navigation: mockNavigation });
    expect(result.title).toBe('mockTitle');
  });
  it('Should return the correct object when navigationOptions is called (no album title provided case)', () => {
    mockNavigation.getParam.mockImplementationOnce(() => ({
      photos: []
    }));
    const result = PhotoListScreen.navigationOptions({ navigation: mockNavigation });
    expect(result.title).toBe(PHOTO_LIST_SCREEN_DEFAULT_TITLE);
  });
  test('FlatLists keyExtractor should return the items id', () => {
    const component = shallow(<PhotoListScreen navigation={mockNavigation} />);
    const flatList = component.find('FlatList').first();
    const extracted = flatList.props().keyExtractor(mockPhoto);
    expect(extracted).toBe(mockPhoto.id);
  });
});
