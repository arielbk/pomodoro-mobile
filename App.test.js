import React from 'react';
import { render } from 'react-native-testing-library';
import App from './App';

describe('<App />', () => {
  it('has 1 child', () => {
    const tree = render(<App />);
  });
});
