import React from 'react';
import { create } from 'react-test-renderer';

import PhotoDetailScreen from '../PhotoDetailScreen';

describe('PhotoDetailScreen test suite', () => {
  it('Should match snapshot', () => {
    const component = create(<PhotoDetailScreen />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
