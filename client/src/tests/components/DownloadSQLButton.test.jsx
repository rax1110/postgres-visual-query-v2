import React from 'react';
import { shallow } from 'enzyme';
import { DownloadSQLButton } from '../../components/DownloadSQLButton';

describe('Component: DownloadSQLButton', () => {
  let component;

  test('DownloadSQLButton renders with default props', () => {
    component = shallow(<DownloadSQLButton sql="" />);

    expect(component).toMatchSnapshot();
  });

  test('DownloadSQLButton click with navigator.msSaveBlob', () => {
    window.navigator.msSaveBlob = true;
    window.navigator.msSaveOrOpenBlob = jest.fn();

    component = shallow(<DownloadSQLButton sql="" />);

    component.simulate('click');

    expect(component).toMatchSnapshot();
  });

  test('DownloadSQLButton click without navigator.msSaveBlob', () => {
    window.navigator.msSaveBlob = false;
    global.URL.createObjectURL = jest.fn();

    component = shallow(<DownloadSQLButton sql="" />);

    component.find('Button');

    expect(component).toMatchSnapshot();
  });
});
