import React from 'react';
import { shallow } from 'enzyme';
import LandingPage from '../../routes/LandingPage';

describe('Route: LandingPage', () => {
  let component;

  test('LandingPage renders', () => {
    component = shallow(<LandingPage />);

    expect(component).toMatchSnapshot();
  });
});
