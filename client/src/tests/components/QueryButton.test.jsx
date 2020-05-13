import React from 'react';
import { shallow } from 'enzyme';
import { QueryButton } from '../../components/QueryButton';

describe('Component: QueryButton', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      host: '',
      port: 1234,
      database: '',
      user: '',
      password: '',
      sql: '',
      language: { code: 'eng' },
      querying: false,
      query: jest.fn(),
      updateValidity: jest.fn(),
    };
  });

  test('QueryButton rendered with default props', () => {
    component = shallow(<QueryButton {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('QueryButton handleOnClick to call updateValidity', () => {
    component = shallow(<QueryButton {...props} />);

    component.find('Button').simulate('click');

    expect(props.updateValidity).toBeCalled();
    expect(props.query).toBeCalled();
  });
});
