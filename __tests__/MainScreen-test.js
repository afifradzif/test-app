import React from 'react';
import renderer from 'react-test-renderer';
import MainScreen from '../src/screens/MainScreen';

test('mainScreen render', () => {
  const mainScreen = renderer.create(<MainScreen />).toJSON();
  expect(mainScreen).toMatchSnapshot();
});