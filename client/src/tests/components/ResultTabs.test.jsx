import React from 'react';
import { shallow } from 'enzyme';
import { ResultTabs } from '../../components/ResultTabs';

describe('Component: ResultTabs', () => {
  let component;

  test('ResultTabs resndes with default props', () => {
    component = shallow(<ResultTabs language={{ code: 'eng' }} />);

    expect(component).toMatchSnapshot();
  });
});
