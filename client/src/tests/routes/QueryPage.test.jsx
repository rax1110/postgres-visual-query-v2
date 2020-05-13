import React from 'react';
import * as renderer from 'react-test-renderer';
import { QueryPage } from '../../routes/QueryPage';

jest.mock('../../components/LanguageSwitcher', () => () => 'LanguageSwitcher');
jest.mock('../../components/DisconnectButton', () => () => 'DisconnectButton');
jest.mock('../../components/SchemaSelector', () => () => 'SchemaSelector');
jest.mock('../../components/SearchBar', () => () => 'SearchBar');
jest.mock('../../components/DatabaseViewer', () => () => 'DatabaseViewer');
jest.mock('../../components/NavBar', () => () => 'NavBar');
jest.mock('../../components/QueryTable', () => () => 'QueryTable');
jest.mock('../../components/QueryTabs', () => () => 'QueryTabs');
jest.mock('../../components/QueryButton', () => () => 'QueryButton');
jest.mock('../../components/DeleteQueryButton', () => () => 'DeleteQueryButton');
jest.mock('../../components/DownloadSQLButton', () => () => 'DownloadSQLButton');
jest.mock('../../components/DownloadCSVButton', () => () => 'DownloadCSVButton');
jest.mock('../../components/ResultTabs', () => () => 'ResultTabs');

describe('Route: QueryPage', () => {
  let component;

  it('QueryPage renders with default props', () => {
    component = renderer.create(<QueryPage language={{ code: 'eng' }} tables={[]} queryValid queries={[]} />)
      .toJSON();

    expect(component).toMatchSnapshot();
  });
});
