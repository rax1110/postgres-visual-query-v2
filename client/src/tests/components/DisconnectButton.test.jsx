import React from 'react';
import { shallow } from 'enzyme';
import { DisconnectButton } from '../../components/DisconnectButton';

describe('Component: DisconnectButton', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      disconnect: jest.fn(),
      connected: true,
      language: { code: 'eng' },
      deleteQueries: jest.fn(),
    };
  });

  test('Disconnect button renders with default props', () => {
    component = shallow(<DisconnectButton {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('DisconnectButton handleOnClick calls disconnect once', () => {
    component = shallow(<DisconnectButton {...props} />);

    component.find('Button').simulate('click');

    expect(props.disconnect.mock.calls.length).toBe(1);
  });
});
