import React from 'react';
import * as renderer from 'react-test-renderer';
import { AddNewButton } from '../../components/AddNewButton';

describe('Component: AddNewButton', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <AddNewButton
          id=""
          size=""
          onClick={() => {}}
        />,
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
