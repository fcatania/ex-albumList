import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';

import AlbumCoverCard from './AlbumCoverCard';

const mockOnPress = jest.fn();
const mockProps = {
  index: 0,
  coverUrl: 'mockUri',
  title: 'mockTitle',
  photos: []
};

describe('AlbumCoverCard test suite', () => {
  beforeEach(() => {
    mockOnPress.mockClear();
  });
  it('Should match snapshot', () => {
    const component = create(
      <AlbumCoverCard {...mockProps} onPress={mockOnPress} />
    ).toJSON();
    expect(component).toMatchSnapshot();
  });
  it('Should call onPress function when pressed', () => {
    const component = shallow(
      <AlbumCoverCard {...mockProps} onPress={mockOnPress} />
    );
    const touchable = component.find('TouchableWithoutFeedback').first();
    touchable.props().onPress();
    expect(mockOnPress).toHaveBeenCalled();
  });
});
