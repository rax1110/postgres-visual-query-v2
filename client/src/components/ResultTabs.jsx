import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { connect } from 'react-redux';
import ResultTable from './ResultTable';
import { withTabSwitcher } from '../hocs/withTabSwitcher';
import { translations } from '../utils/translations';
import ResultSQL from './ResultSQL';

export const ResultTabs = ({ activeTab, toggle, language, result }) => (
  <div>
    <Nav tabs>
      <NavItem>
        <NavLink
          className={activeTab === '1' ? 'active' : ''}
          onClick={() => {
            toggle('1');
          }}
        >
          SQL
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={activeTab === '2' ? 'active' : ''}
          onClick={() => {
            toggle('2');
          }}
        >
          {`${translations[language.code].queryBuilder.resultH}${result ? ` (${result.rowCount || 0})` : ''}`}
        </NavLink>
      </NavItem>
    </Nav>
    <TabContent activeTab={activeTab}>
      <TabPane tabId="1">
        <Container fluid>
          <Row>
            <Col sm="12" className="p-1 h-auto">
              <ResultSQL />
            </Col>
          </Row>
        </Container>
      </TabPane>
      <TabPane tabId="2">
        <Container fluid>
          <Row>
            <Col sm="12" className="p-1">
              <ResultTable />
            </Col>
          </Row>
        </Container>
      </TabPane>
    </TabContent>
  </div>
);

ResultTabs.propTypes = {
  activeTab: PropTypes.string,
  toggle: PropTypes.func,
  language: PropTypes.shape({
    code: PropTypes.string,
  }),
  result: PropTypes.shape({
    rowCount: PropTypes.number,
  }),
};

const mapStateToProps = store => ({
  result: store.query.result,
  language: store.settings.language,
});

export default withTabSwitcher(connect(mapStateToProps)(ResultTabs));
