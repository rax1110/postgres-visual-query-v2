import React from 'react';
import { shallow } from 'enzyme';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';

describe('Component: LanguageSwitcher', () => {
  let component;

  test('LanguageSwitcher renders with default props', () => {
    component = shallow(<LanguageSwitcher language={{ name: 'English', code: 'eng' }} />);

    expect(component).toMatchSnapshot();
  });
});
