import React, { useState } from 'react';
import { Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import QueryColumnList from './QueryColumnList';
import JoinList from './JoinList';
import { translations } from '../utils/translations';
import SetList from './SetList';

export const QueryTabs = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  return (
    <div>
      <Nav tabs className="flex-row">
        <NavItem>
          <NavLink
            className={activeTab === '1' ? 'active' : ''}
            onClick={() => {
              setActiveTab('1');
            }}
          >
            {translations[props.language.code].queryBuilder.columnsH}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === '2' ? 'active' : ''}
            onClick={() => {
              setActiveTab('2');
            }}
          >
            {translations[props.language.code].queryBuilder.joinsH}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === '3' ? 'active' : ''}
            onClick={() => {
              setActiveTab('3');
            }}
          >
            {translations[props.language.code].queryBuilder.setsH}
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab} style={{ minHeight: '20vh' }}>
        <TabPane tabId="1">
          <Container fluid>
            <Row>
              <Col sm="12" className="p-1">
                <QueryColumnList />
              </Col>
            </Row>
          </Container>
        </TabPane>
        <TabPane tabId="2">
          <Container fluid>
            <Row>
              <Col sm="12" className="p-1">
                <JoinList />
              </Col>
            </Row>
          </Container>
        </TabPane>
        <TabPane tabId="3">
          <Container fluid>
            <Row>
              <Col sm="12" className="p-1">
                <SetList />
              </Col>
            </Row>
          </Container>
        </TabPane>
      </TabContent>
    </div>
  );
};

QueryTabs.propTypes = {
  language: PropTypes.shape({ code: PropTypes.string }),
};

const mapStateToProps = store => ({
  language: store.settings.language,
});

export default connect(mapStateToProps)(QueryTabs);
