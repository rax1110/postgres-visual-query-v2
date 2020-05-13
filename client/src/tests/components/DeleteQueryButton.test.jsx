import React from 'react';
import { shallow } from 'enzyme';
import { DeleteQueryButton } from '../../components/DeleteQueryButton';

describe('Component: DeleteQueryButton', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      deleteQuery: jest.fn(),
      deleteQueries: jest.fn(),
      removeMainFromQueries: jest.fn(),
      setActiveQuery: jest.fn(),
      queries: [{
        id: 0,
        queryName: 'Main',
      }],
    };

    component = shallow(<DeleteQueryButton {...props} />);
  });

  test('DeleteQueryButton renders with default props', () => {
    expect(component).toMatchSnapshot();
  });

  test('DeleteQueryButton handleOnClick calls deleteQuery once', () => {
    component.find('Button').simulate('click');

    expect(props.deleteQuery.mock.calls.length).toBe(1);
  });

  test('DeleteQueryButton handleOnClick calls removeMainFromQueries once', () => {
    component.find('Button').simulate('click');

    expect(props.removeMainFromQueries.mock.calls.length).toBe(1);
  });

  test('DeleteQueryButton handleOnClick calls setActiveQuery once', () => {
    component.find('Button').simulate('click');

    expect(props.setActiveQuery.mock.calls.length).toBe(1);
  });

  test('DeleteQueryButton handleOnClick should not call deleteQueries when Main query is not active', () => {
    const newProps = {
      ...props,
      queries: [{
        id: 1,
        queryName: 'Query 1',
      }],
    };

    component = shallow(<DeleteQueryButton {...newProps} />);
    component.find('Button').simulate('click');

    expect(props.deleteQueries.mock.calls.length).toBe(1);
  });
});
