import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import HomeView from 'ui/views/account/home';

describe('Initialization', () => {
  it('runs a basic test', () => {
    expect(4).toBe(4);
  });
  
  // it('renders correctly', () => {
  //   const tree = renderer.create(
  //     <HomeView />
  //   );
  // });
});
