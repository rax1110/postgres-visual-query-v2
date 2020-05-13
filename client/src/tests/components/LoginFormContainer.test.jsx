import React from 'react';
import { shallow } from 'enzyme';
import { LoginFormContainer } from '../../components/LoginFormContainer';

describe('Component: LoginFormContainer', () => {
  let component;

  test('LoginFormContainer renders with default props', () => {
    component = shallow(<LoginFormContainer
      connected={false}
      connecting={false}
      language={{ code: 'eng' }}
      error=""
    />);

    expect(component).toMatchSnapshot();
  });
});
