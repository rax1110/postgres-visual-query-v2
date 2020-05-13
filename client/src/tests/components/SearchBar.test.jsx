import React from 'react';
import { shallow } from 'enzyme';
import { Input } from 'reactstrap';
import { SearchBar } from '../../components/SearchBar';

describe('Component: SearchBar', () => {
  let component;

  beforeEach(() => {
    component = shallow(<SearchBar language={{ code: 'eng' }} search={jest.fn()} />);
  });

  test('SearchBar renders with default props', () => {
    expect(component).toMatchSnapshot();
  });

  test('Input save to state', () => {
    const input = component.find(Input);

    input.props().onChange({ target: {
      name: 'expr',
      value: 'text',
    } });

    expect(component.state('expr')).toEqual('text');
  });
});
