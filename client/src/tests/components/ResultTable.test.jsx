import React from 'react';
import { shallow } from 'enzyme';
import { ResultTable } from '../../components/ResultTable';

describe('Component: ResultTable', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      result: {
        fields: [
          {
            columnID: 2,
            dataTypeID: 1043,
            dataTypeModifier: 54,
            dataTypeSize: -1,
            format: 'text',
            name: 'nimetus',
            tableID: 370833,
          },
        ],
        rows: [
          {
            nimetus: 'Klassifikaatorite haldur',
          },
          {
            nimetus: 'Juhataja',
          },
        ],
      },
      error: null,
    };
  });

  test('ResultTable renders with default props', () => {
    component = shallow(<ResultTable {...props} />);

    expect(component).toMatchSnapshot();
  });
});
