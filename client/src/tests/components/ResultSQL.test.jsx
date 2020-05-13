import React from 'react';
import { shallow } from 'enzyme';
import { ResultSQL } from '../../components/ResultSQL';

describe('Component: ResultSQL', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      sql: '',
      updateSqlProp: jest.fn(),
      data: 'test',
    };
  });

  test('ResultSQL renders with default props', () => {
    component = shallow(<ResultSQL {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('ResultSQL should call with updateSqlProp once', () => {
    const editor = {};
    const data = { origin: 'test' };
    const value = 'test';

    component = shallow(<ResultSQL {...props} />);

    component.find('UnControlled').invoke('onChange')(editor, data, value);

    expect(props.updateSqlProp).toBeCalled();
  });
});
