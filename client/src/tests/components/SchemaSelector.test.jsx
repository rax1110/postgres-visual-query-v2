import React from 'react';
import { shallow } from 'enzyme';
import { SchemaSelector } from '../../components/SchemaSelector';

describe('Component: SchemaSelector', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      schemas: [
        'public', 'information_schema',
      ],
      selectedSchema: 'public',
      language: { code: 'eng' },
      changeSelectedSchema: jest.fn(),
    };
  });

  test('SchemaSelector renders with default props', () => {
    component = shallow(<SchemaSelector {...props} />);

    expect(component).toMatchSnapshot();
  });
});
