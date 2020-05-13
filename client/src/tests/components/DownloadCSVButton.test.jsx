import React from 'react';
import { shallow } from 'enzyme';
import { DownloadCSVButton } from '../../components/DownloadCSVButton';

describe('Component: DownloadCSVButton', () => {
  let component;

  test('Disconnect button renders with default props', () => {
    component = shallow(<DownloadCSVButton result={null} />);

    expect(component).toMatchSnapshot();
  });

  test('Disconnect button renders with result', () => {
    const result = {
      fields: [
        {
          columnID: 1,
          dataTypeID: 21,
          dataTypeModifier: -1,
          dataTypeSize: 2,
          format: 'text',
          name: 'amet_kood',
          tableID: 370833,
        },
      ],
      rows: [
        {
          amet_kood: 1,
        },
      ],
    };

    component = shallow(<DownloadCSVButton result={result} />);

    expect(component).toMatchSnapshot();
  });
});
