import React from 'react';
import { shallow } from 'enzyme';
import { QueryTabs } from '../../components/QueryTabs';

describe('Component: QueryTabs', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      language: { code: 'eng' },
    };
  });

  test('QueryTabs renders with default props', () => {
    component = shallow(<QueryTabs {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('QueryTabs sets first tab active', () => {
    component = shallow(<QueryTabs {...props} />);
    component.find('NavLink').first().simulate('click');

    expect(component.find('NavLink').first().prop('className')).toEqual('active');
  });
});
