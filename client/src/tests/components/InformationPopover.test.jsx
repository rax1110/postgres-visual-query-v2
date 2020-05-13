import React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { InformationPopover } from '../../components/InformationPopover';

describe('Component: InformationPopover', () => {
  let props;
  let div;

  beforeEach(() => {
    props = {
      language: { code: 'eng' },
    };

    div = document.createElement('div');

    document.body.appendChild(div);
  });

  it('renders correctly', () => {
    const tree = renderer.create(mount(<InformationPopover {...props} />, { attachTo: div }))
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
