import React from 'react';
import { Alert, Col, Container, Row } from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { translations } from '../utils/translations';
import QueryTable from '../components/QueryTable';
import QueryTabs from '../components/QueryTabs';
import QueryButton from '../components/QueryButton';
import DeleteQueryButton from '../components/DeleteQueryButton';
import DownloadSQLButton from '../components/DownloadSQLButton';
import DownloadCSVButton from '../components/DownloadCSVButton';
import ResultTabs from '../components/ResultTabs';
import LanguageSwitcher from '../components/LanguageSwitcher';
import DisconnectButton from '../components/DisconnectButton';
import SchemaSelector from '../components/SchemaSelector';
import SearchBar from '../components/SearchBar';
import DatabaseViewer from '../components/DatabaseViewer';
import NavBar from '../components/NavBar';

export const SideBar = props => (
  <div className="d-flex flex-column w-100">
    <div className="">
      <LanguageSwitcher />
      <DisconnectButton />
    </div>
    <SchemaSelector />
    <SearchBar />
    <h5 className="mt-2">{translations[props.language.code].sideBar.tablesH}</h5>
    <div className="d-flex flex-fill">
      <DatabaseViewer />
    </div>
  </div>
);

SideBar.propTypes = {
  language: PropTypes.shape({ code: PropTypes.string }),
};

export const QueryBuilder = (props) => {
  const showDeleteBtn = () => !(props.activeQueryId === 0 && !props.tables.length)
    || props.queriesLength > 0;

  return (
    <div className="mt-0 pr-2">
      <NavBar language={props.language} />
      <div style={{ minHeight: '40vh' }}>
        {props.tables.map((table, index) => (
          <QueryTable
            key={`query-table-${index}-${table.id}`}
            id={`query-table-${index}`}
            data={table}
          />
        ))}
      </div>
      <QueryTabs />
      <div className="my-2">
        <QueryButton queryValid={props.queryValid} />
        {showDeleteBtn() && <DeleteQueryButton />}
        <DownloadSQLButton />
        <DownloadCSVButton />
      </div>
      {!props.queryValid && (
        <Alert color="danger" className="w-25">
          {translations[props.language.code].queryBuilder.invalidQuery}
        </Alert>
      )}
      <ResultTabs />
    </div>
  );
};

QueryBuilder.propTypes = {
  language: PropTypes.shape({ code: PropTypes.string }),
  tables: PropTypes.arrayOf(PropTypes.shape({})),
  activeQueryId: PropTypes.number,
  queryValid: PropTypes.bool,
  queriesLength: PropTypes.number,
};

export const QueryPage = props => (
  <Container fluid>
    <Row>
      <Col sm="2" className="py-2 vh-100 d-flex bg-light">
        <SideBar language={props.language} />
      </Col>
      <Col sm="10" className="pr-0">
        <Scrollbars>
          <QueryBuilder
            queryValid={props.queryValid}
            language={props.language}
            tables={props.tables}
            activeQueryId={props.activeQueryId}
            queriesLength={props.queries.length}
          />
        </Scrollbars>
      </Col>
    </Row>
  </Container>
);

QueryPage.propTypes = {
  language: PropTypes.shape({ code: PropTypes.string }),
  tables: PropTypes.arrayOf(PropTypes.shape({})),
  activeQueryId: PropTypes.number,
  queryValid: PropTypes.bool,
  queries: PropTypes.arrayOf(PropTypes.shape({})),
};

const mapStateToProps = store => ({
  tables: store.query.tables,
  language: store.settings.language,
  queryValid: store.query.queryValid,
  activeQueryId: store.query.id,
  queries: store.queries,
});

export default connect(mapStateToProps)(QueryPage);
