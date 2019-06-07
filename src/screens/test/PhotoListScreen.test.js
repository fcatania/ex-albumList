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
  })),
  navigate: jest.fn()
};

describe('PhotoListScreen test suite', () => {
  beforeEach(() => {
    mockNavigation.getParam.mockClear();
    mockNavigation.navigate.mockClear();
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
  it('Should call navigate when goToPhotoDetail is called', () => {
    const component = shallow(<PhotoListScreen navigation={mockNavigation} />);
    const instance = component.instance();
    instance.goToPhotoDetail('mockId');
    expect(mockNavigation.navigate).toHaveBeenCalled();
  });
  test('TouchableWithoutFeedback onPress should call navigate', () => {
    const component = shallow(<PhotoListScreen navigation={mockNavigation} />);
    const flatList = component.find('FlatList').first();
    const virtualizedList = flatList.dive().find('VirtualizedList').first();
    const cellRenderer = virtualizedList.dive().find('CellRenderer').first();
    const touchable = cellRenderer.dive().find('TouchableWithoutFeedback').first();
    touchable.props().onPress();
    expect(mockNavigation.navigate).toHaveBeenCalled();
  });
});
